let contenido = "";

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

function mostrarPlatillo(platillo, id) {
  let fotoPlatillo = "";
  if (platillo.foto) {
    fotoPlatillo = platillo.foto; // ya es un DataURL válido
  } else {
    fotoPlatillo = "img/default.jpg"; // ruta a la imagen por defecto
  }

  contenido = `
  <div class='card-panel recipe white row' id='${id}' data-id='${id}'>
    <img src="${fotoPlatillo}" height="100px" width="100px">
    <div class='recipe-details'>
        <div class='recipe-title'>
          ${platillo.nombre}
        </div>
        <div class='recipe-ingredients'>
          ${platillo.ingredientes}
        </div>
        <div class='recipe-price'>
          $${platillo.precio} MXN
        </div>
        <div class="recipe-delete">
          <i class="material-icons" data-id="${id}">
          delete_outline
          </i>
        </div>
    </div>
  </div>
  `;

  document.querySelector(".recipes").innerHTML += contenido;
};

function actualizarPlatillo(platillo, id) {
  let tarjeta = document.getElementById(`${id}`);
  tarjeta.querySelector(".recipe-title").innerHTML = platillo.nombre;
  tarjeta.querySelector(".recipe-ingredients").innerHTML = platillo.ingredientes;
  tarjeta.querySelector(".recipe-price").innerHTML = `$${platillo.precio} MXN`;
}

const borrarPlatillo = (id) => {
  const platillo = document.querySelector(`.recipe[data-id="${id}"]`);
  platillo.remove();
};

let streaming = false;
//Este es el tamaño de la foto que se va a tomar
let width = 320;
let height = 0;
const video = document.getElementById('Video');
const canvas = document.getElementById('Canvas');
const foto = document.getElementById('foto');
const btnFoto = document.getElementById('btnFoto');

btnFoto.addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const fotoFinal = e.target.result; // base64 de la imagen
      foto.setAttribute("src", fotoFinal); // mostrar en <img>
      document.getElementById("fotoInput").value = fotoFinal; // guardar en input oculto
    };
    reader.readAsDataURL(file);
  } else {
    // Si no se selecciona nada, usar default.jpg
    foto.setAttribute("src", "img/default.jpg");
    document.getElementById("fotoInput").value = "img/default.jpg";
  }
});

video.addEventListener("canplay", () => {
  if (!streaming) {
    height = video.videoHeight / (video.videoWidth / width);
    video.setAttribute("width", width);
    video.setAttribute("height", height);
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    streaming = true;
  }
})

function tomarFoto() {
  const context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const fotoFinal = canvas.toDataURL("image/png");
    foto.setAttribute("src", fotoFinal);
    document.getElementById("fotoInput").value = fotoFinal;

    // 🔹 Ocultar el cuadro de la cámara
    document.getElementById("Camera").style.display = "none";
  } else {
    limpiarfoto();
  }
}

function limpiarfoto() {
  foto.setAttribute("src", "img/default.jpg"); // volver al default
  document.getElementById("fotoInput").value = "img/default.jpg";

  if (video.srcObject) {
    const tracks = video.srcObject.getTracks();
    tracks.forEach(track => track.stop()); // detener cada pista
    video.srcObject = null; // limpiar referencia
  }
  const cameraContainer = document.getElementById("Camera");
  cameraContainer.style.display = "block";
  video.pause();
  video.removeAttribute("src");
  video.load();
}

const btnCapturar = document.getElementById('btnCapturar');
const btnLimpiar = document.getElementById('btnLimpiar');

btnCapturar.addEventListener("click", (e) => {
  e.preventDefault();
  tomarFoto(); 
});

// Limpiar foto
btnLimpiar.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarfoto(); 
});

// Botón para iniciar cámara
const btnCamara = document.getElementById("btnCamara");

btnCamara.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }, // cámara trasera
      audio: false
    });
    video.srcObject = stream;
    video.play();
  } catch (error) {
    console.error("Error al acceder a la cámara trasera:", error);
    alert("No se pudo abrir la cámara trasera. Verifica permisos y HTTPS.");
  }
});

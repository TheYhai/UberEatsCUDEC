let contenidoLista = "";

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});

  // Botones
  const btnGuardar = document.getElementById("btnGuardar");
  const btnCancelar = document.getElementById("btnCancelar");

  // Guardar pedido
  btnGuardar.addEventListener("click", function() {
    const platillo = document.getElementById("listaplatillos").options[
      document.getElementById("listaplatillos").selectedIndex
    ].text;
    const nombre = document.getElementById("txtNombre").value;
    const direccion = document.getElementById("txtDireccion").value;

    if (platillo === "" || nombre === "" || direccion === "") {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Guardar en Firebase (colección pedidos)
    db.collection("pedidos").add({
      direccion: direccion,
      nombre: nombre,
      platillo: platillo
    })
    .then((docRef) => {
      alert("Pedido registrado con ID: " + docRef.id);

      // Limpiar contenedor QR antes de generar uno nuevo
      document.getElementById("qr").innerHTML = "";

      // Generar QR con el nombre del platillo
      new QRCode(document.getElementById("qr"), {
        text: platillo,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });

      // limpiar formulario
      document.getElementById("listaplatillos").value = "";
      document.getElementById("txtNombre").value = "";
      document.getElementById("txtDireccion").value = "";
    })
    .catch((error) => {
      console.error("Error al guardar el pedido:", error);
    });
  });

  // Cancelar
  btnCancelar.addEventListener("click", function() {
    document.getElementById("listaplatillos").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtDireccion").value = "";
  });
});


// --------------------
// LISTA DE PLATILLOS
// --------------------
db.collection("platillos").onSnapshot((coleccion) => {
    coleccion.docChanges().forEach((registro) => {
        if (registro.type === "added") {
            agregarALista(registro.doc.data(), registro.doc.id);
        }
    });
});

function agregarALista(platillo, id) {
    contenidoLista += `<option value='${id}'>${platillo.nombre}</option>`;
    document.getElementById("listaplatillos").innerHTML = contenidoLista;
}


// --------------------
// UBICACIÓN
// --------------------
document.getElementById("btnUbicacion").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exito, error);
    } else {
        alert("Este navegador no soporta geolocalización");
    }
});

function exito(posicion) {
    let latitud = posicion.coords.latitude;
    let longitud = posicion.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`, { 
        headers: {
            'User-Agent': 'Yhaieats (lizcolin39@gmail.com)'
        }   
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        let ciudad = data.address.city;
        let pais = data.address.country;
        document.getElementById("txtDireccion").innerHTML = `${ciudad}, ${pais}`;

        var map = L.map('map').setView([latitud, longitud], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([latitud, longitud]).addTo(map);
    })
    .catch(error => console.error(error));
}

function error(posicion){
    alert("Error al obtener la ubicación");
    console.log(error);
}

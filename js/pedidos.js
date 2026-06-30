let contenidoLista = "";

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
});

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


//

document.getElementById("btnUbicacion").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exito, error);
    } else {
        alert("Este navegador no soporta geolocalización");
    }
});

function exito(posicion) {
    alert("Latitud: " + posicion.coords.latitude + 
          " Longitud: " + posicion.coords.longitude);
    let latitud = posicion.coords.latitude
    let longitud = posicion.coords.longitude
    fetch(`https://nominatin.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`,{ 
        headers: {
            'User-Agent': 'Yhaieats (lizcolin39@gmail.com)'
        }   
    })
    .then (respuesta => respuesta.json())
    .then(data => alert(data.display_name))
    .catch(error => console.error(error));

}

function error(posicion){
    alert("Error al obtener la ubicacion");
    console.log(error);
}


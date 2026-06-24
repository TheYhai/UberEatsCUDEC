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
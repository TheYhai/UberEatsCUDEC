let contenidoLista = "";

 db.collection("platillos").onSnapshot((coleccion) => {
     coleccion.docChanges().forEach((registro) => {
         if (registro.type === "added") {
            mostrarPlatillo(registro.doc.data(), registro.doc.id);
         }
         if (registro.type === "modified") {
             actualizarPlatillo(registro.doc.data(), registro.doc.id);
         }
         if (registro.type === "removed") { 
             borrarPlatillo(registro.doc.id);
         }
     });
 });

const formularioAgregar = document.querySelector(".add-recipe");

formularioAgregar.addEventListener("submit", (e) => {
  e.preventDefault();

  const platilloNuevo = {
    nombre: document.getElementById("title").value,
    ingredientes: document.getElementById("ingredients").value,
    precio: document.getElementById("price").value,
    foto: document.getElementById("fotoInput").value // 🔑 aquí se guarda la imagen
  };

  db.collection("platillos").add(platilloNuevo)
    .then(() => {
      alert("Platillo agregado correctamente");
      formularioAgregar.reset();
      document.getElementById("foto").setAttribute("src", ""); // limpia preview
    })
    .catch((error) => {
      console.error(error);
      alert("Error al agregar el platillo");
    });
});

const platilloBorrar = document.querySelector(".recipes");
platilloBorrar.addEventListener("click", (e) => {
    if (e.target.tagName === "I") {
        const id = e.target.getAttribute("data-id");
        const confirmar = confirm("¿Seguro que deseas eliminar este platillo?");
        if (confirmar) {
            db.collection("platillos").doc(id).delete()
            .then(() => {
                alert("Platillo eliminado correctamente");
            })
            .catch((error) => {
                console.error(error);
                alert("Error al eliminar el platillo");
            });
        }
    }
});

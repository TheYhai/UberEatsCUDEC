## 1. Título del proyecto
- **Nombre de la aplicación:** YhaiEats  
- **Tipo de aplicación:** PWA (Progressive Web App)  
- **Descripción breve:** Aplicación web progresiva para gestionar platillos, pedidos de manera rápida y accesible  
  - Materia: Taller de programación avanzada 2
  - Carrera: Informática / Sistemas Computacionales  
  - Alumno: Ricardo Yhai Maldonado Colin

 ---
 
## 2. Descripción del proyecto
- Yhaieats es una app que busca resolver la necesidad de gestionar pedidos de comida en linea de manera rápida y sencilla, facilitando la administración de platillos y pedidos, nuestros usuarios son cualquier persona que requiera el uso de un sistema de pedidos, el propósito es la de ofrecer una plataforma ligera y accesible que ofrezca el funcionamiento de una app de delivery

---

## 3. Objetivos

- **Objetivo general:**  
  Desarrollar una aplicación web progresiva que permita registrar platillos, realizar pedidos y gestionar información de clientes de manera eficiente.
  
- **Objetivos específicos:**  
  - Implementar un sistema de registro de platillos con fotos, ingredientes y precios.  
  - Permitir a los usuarios realizar pedidos con nombre, dirección y selección de platillo.  
  - Integrar un mapa  para obtener la ubicación del cliente de manera mas precisa.
  - Generar códigos QR vinculados a los pedidos.  
  - Garantizar compatibilidad en dispositivos móviles mediante PWA.

 ----

 ## 4. Características principales y secundarias
- Registro de platillos con nombre, ingredientes, precio y foto (galería o cámara).  
- Formulario de pedidos con nombre, dirección y selección de platillo.  
- Integración de **Leaflet** para mostrar ubicación en mapa.  
- Generación de **QR codes** para vincular pedidos.  
- Barra lateral de navegación (Inicio, Acerca, Pedidos, Contacto).  
- Compatibilidad PWA: instalación en móviles, íconos y manifest.json.  
- Conexión con **Firebase Firestore** para almacenamiento de datos.

---

## 5. Tecnologías utilizadas
- **Frontend:** HTML5, CSS3, JavaScript ES6  
- **Framework UI:** Materialize CSS v1.0.0  
- **Mapas:** Leaflet v1.9.4  
- **Base de datos:** Firebase Firestore v6.0.1  
- **PWA:** Service Worker + Manifest.json  
- **Generación QR:** QRCode.js v1.0.0

- --

## 6. Estructura del proyecto
```plaintext
UberEatsCUDEC/
│
├── index.html
├── pages/
│   ├── about.html
│   ├── pedidos.html
│   └── contact.html
│
├── css/
│   ├── materialize.min.css
│   └── styles.css
│
├── js/
│   ├── materialize.min.js
│   ├── firebase.js
│   ├── index.js
│   ├── db.js
│   └── pedidos.js
│
├── img/
│   └── default.jpg
│
├── manifest.json
├── sw.js
└── icons/ (varios tamaños)
```

---

## 7. Estructura del proyecto

- Inicio  
![Captura de pantalla 2026-08-17 001018.png](img/Captura%20de%20pantalla%202026-08-17%20001018.png)

- Registrar platillo  
![Captura de pantalla 2026-08-17 001028.png](img/Captura%20de%20pantalla%202026-08-17%20001028.png)

- Realizar pedido  
![Captura de pantalla 2026-08-17 001047.png](img/Captura%20de%20pantalla%202026-08-17%20001047.png)

- Acerca  
![Captura de pantalla 2026-08-17 001414.png](img/Captura%20de%20pantalla%202026-08-17%20001414.png)

- Contacto  
![Captura de pantalla 2026-08-17 001552.png](img/Captura%20de%20pantalla%202026-08-17%20001552.png)


---

## 8. Estructura del proyecto

- **Motor utilizado:**  
  Firebase Firestore (NoSQL en la nube).

- **Colecciones:**  
  - **platillos**: almacena nombre, ingredientes, precio y foto de cada platillo.  
  - **pedidos**: almacena nombre del cliente, dirección y platillo solicitado.
 
---

## 9.Licencia

Este proyecto fue desarrollado con fines académicos como parte de la carrera de Ingeniería en sistemas computacionales, para la materia taller de programación avanzada, del grupo 09ISC182 en Centro Universitario Doctor Emilio Cárdenas (CUDEC).

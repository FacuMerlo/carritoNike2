// Lista de productos de la tienda NIKE.
let productos = {
  '1': {'nombre': 'Remera Jordan Jumpman', 'precio': 45999, 'imagen':'./assets/img/remeraJordanJumpman.jpg'}, 
  '2': {'nombre': 'Remera Jordan Flight Heritage 85', 'precio': 69999, 'imagen':'./assets/img/remeraJordanFlightHeritage85.jpg'}, 
  '3': {'nombre': 'Buzo Nike Sportswear Tech Fleece OG', 'precio': 197999, 'imagen':'./assets/img/buzoNikeSportswearTechFleeceOg.jpg'},
  '4': {'nombre': 'Buzo Ja Standard Issue', 'precio': 101499, 'imagen':'./assets/img/buzoJaStandardIssue.jpg'},
  '5': {'nombre': 'Pantalón Jordan Essentials', 'precio': 139999, 'imagen':'./assets/img/pantalonJordanEssentials.jpg'},
  '6': {'nombre': 'Pantalón Nike Sportswear Club', 'precio': 86499, 'imagen':'./assets/img/pantalonNikeSportswearClub.jpg'},
  '7': {'nombre': 'Zapatillas Nike Air Force 1 07', 'precio': 209999, 'imagen':'./assets/img/zapatillasNikeAirForce107.jpg'},
  '8': {'nombre': 'Zapatillas Air Jordan 1 Low', 'precio': 209999, 'imagen':'./assets/img/zapatillasAirJordan1Low.jpg'},
  '9': {'nombre': 'Campera Jordan para Mujer', 'precio': 197999, 'imagen':'./assets/img/camperaJordanParaMujer.jpg'},
  '10': {'nombre': 'Campera Nike Sportswear Trend', 'precio': 180249, 'imagen':'./assets/img/camperaNikeSportswearTrend.jpg'},
  '11': {'nombre': 'Pelota Nike Mercurial Fade', 'precio': 41999, 'imagen':'./assets/img/pelotaNikeMercurialFade.jpg'},
  '12': {'nombre': 'Gorro Nike Apex', 'precio': 45999, 'imagen':'./assets/img/gorroNikeApex.jpg'},
};

let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

// Funciones del carrito
function mostrarProductos() {
  const seccionProductos = document.getElementById('productos');
  seccionProductos.innerHTML = '';

  Object.keys(productos).forEach((numero) => {
      const producto = productos[numero];
      const divProducto = document.createElement('div');
      divProducto.className = 'producto';
      divProducto.innerHTML = `
          <h3>${producto.nombre}</h3>
          <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
          <p>Precio: $${producto.precio}</p>
          <button onclick="agregarAlCarrito('${numero}')">Agregar al Carrito</button>
      `;
      seccionProductos.appendChild(divProducto);
  });
}


function agregarAlCarrito(numeroProducto) {
  const cantidad = 1; 
  if (carrito[numeroProducto]) {
      carrito[numeroProducto] += cantidad;
  } else {
      carrito[numeroProducto] = cantidad;
  }

  verCarrito();
  calcularTotal();

  localStorage.setItem('carrito', JSON.stringify(carrito));
}


function verCarrito() {
  const seccionCarrito = document.getElementById('carrito');
  seccionCarrito.innerHTML = '<h2>Carrito:</h2>';

  Object.keys(carrito).forEach((numeroProducto) => {
      const producto = productos[numeroProducto];
      const divItemCarrito = document.createElement('div');
      divItemCarrito.className = 'item-carrito';
      divItemCarrito.innerHTML = `
          <p>${producto.nombre} - Cantidad: ${carrito[numeroProducto]} - Precio: $${producto.precio}</p>
      `;
      seccionCarrito.appendChild(divItemCarrito);
  });
}

function calcularTotal() {
  let total = 0;
  Object.keys(carrito).forEach((numeroProducto) => {
      const cantidad = carrito[numeroProducto];
      const precio = productos[numeroProducto].precio;
      total += cantidad * precio;
  });

  const seccionTotal = document.getElementById('total');
  seccionTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function vaciarCarrito() {
  carrito = {}; 
  verCarrito(); 
  calcularTotal(); 
  localStorage.removeItem('carrito');
  alert('El carrito ha sido vaciado.');
}


// Eventos para los botones 
document.addEventListener('DOMContentLoaded', () => {
  const btnVerProductos = document.getElementById('verProductos');
  const btnVerCarrito = document.getElementById('verCarrito');
  const btnFinalizarCompra = document.getElementById('finalizarCompra');
  const btnVaciarCarrito = document.getElementById('vaciarCarrito');
  
  btnVerProductos.addEventListener('click', mostrarProductos);
  btnVerCarrito.addEventListener('click', verCarrito);
  btnFinalizarCompra.addEventListener('click', () => {
      alert('Gracias por tu compra. ¡Hasta la próxima!');
  });
  btnVaciarCarrito.addEventListener('click', vaciarCarrito);

  mostrarProductos();
  if (Object.keys(carrito).length > 0) {
    verCarrito();
    calcularTotal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cargarDatos = async () => {
    try {
      const response = await fetch("productos.json");
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      const productos = await response.json();
      window.productosGlobal = productos;
      mostrarProductos(productos);
      if (Object.keys(carrito).length > 0) {
        verCarrito();
        calcularTotal();
        mostrarSeccionesCarrito();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  cargarDatos();

  const btnFinalizarCompra = document.getElementById("finalizarCompra");
  const btnVaciarCarrito = document.getElementById("vaciarCarrito");

  btnFinalizarCompra.addEventListener("click", finalizarCompra);
  btnVaciarCarrito.addEventListener("click", vaciarCarrito);
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

// Mostrar secciones del carrito
function mostrarSeccionesCarrito() {
  document.getElementById("carritoSection").style.display = "block";
  document.getElementById("finalizarCompra").style.display = "inline-block";
  document.getElementById("vaciarCarrito").style.display = "inline-block";
}

// Ocultar secciones del carrito
function ocultarSeccionesCarrito() {
  document.getElementById("carritoSection").style.display = "none";
  document.getElementById("finalizarCompra").style.display = "none";
  document.getElementById("vaciarCarrito").style.display = "none";
}

// Funciones del carrito
function mostrarProductos(productos) {
  const seccionProductos = document.getElementById("productos");
  seccionProductos.innerHTML = "";

  Object.keys(productos).forEach((numero) => {
    const producto = productos[numero];
    const divProducto = document.createElement("div");
    divProducto.className = "producto";
    divProducto.innerHTML = `
          <h3>${producto.nombre}</h3>
          <img src="${producto.imagen}" alt="${producto.nombre}" class="productoImagen">
          <p>Precio: $${producto.precio}</p>
          <button onclick="agregarAlCarrito('${numero}')">Agregar al Carrito</button>
      `;
    seccionProductos.appendChild(divProducto);
  });
}

function eliminarProducto(numeroProducto) {
  delete carrito[numeroProducto];
  verCarrito();
  calcularTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
  if (Object.keys(carrito).length === 0) {
    ocultarSeccionesCarrito();
  }
}

function sumarCantidad(numeroProducto) {
  carrito[numeroProducto]++;
  verCarrito();
  calcularTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function restarCantidad(numeroProducto) {
  if (carrito[numeroProducto] > 1) {
    carrito[numeroProducto]--;
  } else {
    delete carrito[numeroProducto];
  }
  verCarrito();
  calcularTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
  if (Object.keys(carrito).length === 0) {
    ocultarSeccionesCarrito();
  }
}

function agregarAlCarrito(numeroProducto) {
  const productos = window.productosGlobal;
  const cantidad = 1;

  if (carrito[numeroProducto]) {
    carrito[numeroProducto] += cantidad;
  } else {
    carrito[numeroProducto] = cantidad;
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  verCarrito();
  calcularTotal();
  mostrarSeccionesCarrito();
}

function verCarrito() {
  const productos = window.productosGlobal;
  const seccionCarrito = document.getElementById("carrito");
  seccionCarrito.innerHTML = "";
  seccionCarrito.innerHTML += '<div class="productosCarrito">';

  Object.keys(carrito).forEach((numeroProducto) => {
    const producto = productos[numeroProducto];
    if (!producto) {
      console.error(
        `Producto con el número ${numeroProducto} no encontrado en productos.`
      );
      return;
    }
    const divItemCarrito = document.createElement("div");
    divItemCarrito.className = "itemCarrito";
    divItemCarrito.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="imagenCarrito">
      <div class="infoProductoCarrito">
        <p class="nombreProductoCarrito">${producto.nombre}</p>
        <p>Cantidad: 
          <button class="accionCarrito" onclick="restarCantidad('${numeroProducto}')">-</button>
          ${carrito[numeroProducto]}
          <button class="accionCarrito" onclick="sumarCantidad('${numeroProducto}')">+</button>
        </p>
        <p>Precio: $${producto.precio}</p>
        <button class="eliminarProducto accionCarrito" onclick="eliminarProducto('${numeroProducto}')">Eliminar</button>
      </div>
    `;
    seccionCarrito.appendChild(divItemCarrito);
  });
  seccionCarrito.innerHTML += "</div>";
}

function calcularTotal() {
  const productos = window.productosGlobal;
  let total = 0;
  Object.keys(carrito).forEach((numeroProducto) => {
    const producto = productos[numeroProducto];
    if (producto) {
      const cantidad = carrito[numeroProducto];
      const precio = producto.precio;
      total += cantidad * precio;
    }
  });

  const seccionTotal = document.getElementById("total");
  seccionTotal.innerHTML = `
    <div>
      <h3>Total:</h3>
      <p class="totalCont">$${total.toFixed(2)}</p>
    </div>
  `;
}

function vaciarCarrito() {
  carrito = {};
  verCarrito();
  calcularTotal();
  localStorage.removeItem("carrito");
  mostrarAlerta("El carrito ha sido vaciado.");
  ocultarSeccionesCarrito();
}

function finalizarCompra() {
  if (Object.keys(carrito).length === 0) {
    mostrarAlerta(
      "El carrito está vacío, debe agregar productos para realizar una compra."
    );
  } else {
    mostrarAlerta("Gracias por tu compra. ¡Hasta la próxima!");
    vaciarCarrito();
  }
}

function mostrarAlerta(mensaje) {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alertMesj");
  alertDiv.textContent = mensaje;

  const botAcept = document.createElement("button");
  botAcept.textContent = "Aceptar";
  botAcept.onclick = function () {
    alertDiv.remove();
  };
  botAcept.classList.add("botAcept");

  alertDiv.appendChild(botAcept);

  document.getElementById("alertContainer").appendChild(alertDiv);
}

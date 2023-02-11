/*        PINTAR PRODUCTOS EN EL CARRITO*/
const pintarProductosEnElCarrito = (producto) => {
  console.log(producto);
  const contenedorModal = document.getElementById("modal-body");

  const div = document.createElement("div");
  div.classList.add("productoEnCarrito", "d-flex", "justify-content-between");
  div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: ${producto.precio}</p>
        <p id=cantidad${producto.id}>cantidad: ${producto.cantidad}</p> 
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>

    `;
  contenedorModal.appendChild(div);
};

/*          ACTUALIZAR VALORES DE CANTIDAD Y PRECIO TOTAL*/
const actualizarProductosCarrito = (carrito) => {
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const montoTotalCompra = carrito.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0
  );
  pintarCantidadCarrito(cantidadTotal, montoTotalCompra);
  guardarStorageCarrito(carrito);
};

/*      PINTAR VALORES ACTUALIZADOS DE CANTIDAD Y PRECIO TOTAL*/
const pintarCantidadCarrito = (cantidad, monto) => {
  const cantidadCarrito = document.getElementById("cantidad-carrito");
  const precioCarrito = document.getElementById("precio-carrito");
  const cantidadTotalCarrito = document.getElementById(
    "cantidad-total-carrito"
  );
  cantidadCarrito.innerText = carrito.length;
  precioCarrito.innerText = monto;
  cantidadTotalCarrito.innerText = cantidad;
};

/*        ELIMINAR PRODUCTOS DEL CARRITO*/

const elementoAEliminar = document.querySelector(".modal-body");

elementoAEliminar.addEventListener("click", (e) => {
  if (e.target.classList.contains("boton-eliminar")) {
    console.log(e.target.value);
    eliminarProductoCarrito(e.target.value);
  }
});

const eliminarProductoCarrito = (productoId) => {
  const productoIndice = carrito.findIndex(
    (producto) => producto.id == productoId
  );

  carrito[productoIndice].cantidad = 1;
  carrito.splice(productoIndice, 1);
  actualizarCarritoPorEliminados(carrito);
};
/*      ACTUALIZAR CARRITO CON PRODUCTOS ELIMINADOS*/

const actualizarCarritoPorEliminados = (carrito) => {
  const contenedorModal = document.getElementById("modal-body");
  contenedorModal.innerHTML = " ";
  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito", "d-flex", "justify-content-between");
    div.innerHTML = `
          <p>${producto.nombre}</p>
          <p>Precio: ${producto.precio}</p>
          <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
          <button class="btn btn-primary sumar" value="${producto.id}">+</button> <button class="btn btn-danger restar" value="${producto.id}">-</button> 
          <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
      `;
    contenedorModal.appendChild(div);
  });
  actualizarProductosCarrito(carrito);
};

/*        STORAGE       */

/*Guardar como JSON*/
const guardarStorageCarrito = (carrito) => {
  localStorage.setItem("carritoCompra", JSON.stringify(carrito));
};

/*Recuperar JSON y parsear*/
const obtenerStorageCarrito = () => {
  const carritoStorage = JSON.parse(localStorage.getItem("carritoCompra"));
  return carritoStorage;
};

/*pasar carrito a las funciones para pintarlo*/
const cargarCarrito = () => {
  if (localStorage.getItem("carritoCompra")) {
    carrito = obtenerStorageCarrito();
    actualizarProductosCarrito(carrito);
    actualizarCarritoPorEliminados(carrito);
  }
};

/*    FINALIZAR COMPRA      */

const finalizar = document.querySelector(".modal-footer");
finalizar.addEventListener("click", (e) => {
  // e.stopPropagation()
  if (e.target.classList.contains("finalizar-compra")) {
    if (carrito.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El carrito de compras esta vacio!",
      });
    } else {
      Swal.fire(
        "¡Gracias por su compra!",
        "La compra ha sido realizada con exito",
        "success"
      );
      carrito = [];
      guardarStorageCarrito(carrito);
      actualizarCarritoPorEliminados(carrito);
    }
  }
});

/*agregar o eliminar 1 solo producto desde el modal del carrito */

const sumarORestar = document.querySelector(".modal-body");

sumarORestar.addEventListener("click", (e) => {
  if (e.target.classList.contains("sumar")) {
    productoId = e.target.value;
    const productoRepetido = carrito.find(
      (producto) => productoId == producto.id
    );
    productoRepetido.cantidad++;
  }
  if (e.target.classList.contains("restar")) {
    productoId = e.target.value;
    const productoRepetido = carrito.find(
      (producto) => productoId == producto.id
    );

    if (productoRepetido.cantidad > 1) {
      productoRepetido.cantidad--;
    } else {
      eliminarProductoCarrito(productoRepetido.id);
      console.log(productoRepetido.id);
    }
  }
  actualizarCarritoPorEliminados(carrito);
});

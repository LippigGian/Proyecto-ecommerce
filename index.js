document.addEventListener("DOMContentLoaded", traerProductos);
let carrito = [];
async function traerProductos() {
  const url = "/stock.json";

  try {
    const resultado = await fetch(url);
    const respuesta = await resultado.json();
    pintarProductos(respuesta);
  } catch (error) {
    console.log(error);
  }
}

const pintarProductos = (respuesta) => {
  const contenedor = document.getElementById("container");
  const div = document.createElement("div");
  respuesta.forEach((productos) => {
    contenedor.innerHTML += `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${productos.imagen}" alt="Card image cap">
        <div class="card-sody">
          <h5 class="card-title">${productos.nombre}</h5>
          <p class="card-text">Descripcion: ${productos.desc}.</p>
          <h4 class="card-subtitle"> Talle: ${productos.talle}</h4>
          <h3 class="card-text"> Precio $${productos.precio}</h3>
          <a  id="${productos.id}" class="btn btn-primary agregar" >Agregar al carrito</a>
    
        </div>
      </div>`;
    contenedor.appendChild(div);
  });

  contenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar")) {
      console.log(e.target.id);
      chequearProductos(e.target.id);
    }
  });

  const chequearProductos = (productoId) => {
    const productoRepetido = carrito.find(
      (producto) => productoId == producto.id
    );

    if (!productoRepetido) {
      const producto = respuesta.find((producto) => producto.id == productoId);

      carrito.push(producto);
      pintarProductosEnElCarrito(producto);

      actualizarCarritoPorEliminados(carrito);
    } else {
      productoRepetido.cantidad++;

      actualizarCarritoPorEliminados(carrito);
    }
  };
};

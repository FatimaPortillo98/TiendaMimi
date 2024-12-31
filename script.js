// Selección de elementos del DOM
const carritoButton = document.getElementById('carrito-button');
const carritoIcono = document.querySelector('.carrito');
const carritoModal = document.querySelector('.menu-carrito');
const listaProductosCarrito = document.querySelector('.productos-carrito');
const botonFinalizarCompra = document.querySelector('.finalizar-compra');
const contadorProductos = document.querySelector('.carrito-contador');
const tarjetas = document.querySelectorAll('.tarjeta');
const menuProducto = document.getElementById('menu-producto');
const descripcion = document.querySelector('.descripcion');
const agregarCarritoBtn = document.querySelector('.agregar-carrito');
const totalCuenta = document.querySelector('.total-cuenta'); // Agregar un contenedor para el total

// Variables para el carrito
let carritoItems = [];

// Lista de productos disponibles
const productos = [
    { nombre: "Buzo negro con capucha", descripcion: "Este es un gran producto que necesitas en tu vida. Confortable y moderno.", precio: 10000 },
    { nombre: "Remera negra estilo vintage", descripcion: "Perfecta para combinar con cualquier look. Ideal para cualquier ocasión.", precio: 5000 },
    { nombre: "Pantalón de chambeador", descripcion: "Cómodo, durable y resistente. Perfecto para el día a día.", precio: 10000 }
];

// Función para actualizar el contador de productos en el carrito
function actualizarContador() {
    const totalProductos = carritoItems.reduce((total, item) => total + item.cantidad, 0);
    contadorProductos.textContent = totalProductos;
}

// Función para calcular el total de la cuenta
function calcularTotal() {
    const total = carritoItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
    totalCuenta.textContent = `Total: $${total.toFixed(2)}`; // Mostrar el total con 2 decimales
}

// Función para mostrar el carrito
function mostrarCarrito() {
    listaProductosCarrito.innerHTML = '';

    carritoItems.forEach((item, index) => {
        const productoHTML = document.createElement('div');
        productoHTML.classList.add('producto-carrito');
        productoHTML.innerHTML = `
            <div class="producto-info">
                <p>${item.nombre} - $${item.precio}</p>
                <p>Cantidad: <span class="cantidad">${item.cantidad}</span></p>
            </div>
            <div class="producto-controles">
                <button class="incrementar" data-index="${index}">+</button>
                <button class="decrementar" data-index="${index}">-</button>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            </div>
        `;
        listaProductosCarrito.appendChild(productoHTML);
    });

    // Después de mostrar el carrito, calculamos el total
    calcularTotal();
}

// Función para manejar las acciones de aumentar, disminuir o eliminar productos
listaProductosCarrito.addEventListener('click', (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains('incrementar')) {
        carritoItems[index].cantidad++;
    } else if (e.target.classList.contains('decrementar') && carritoItems[index].cantidad > 1) {
        carritoItems[index].cantidad--;
    } else if (e.target.classList.contains('eliminar')) {
        carritoItems.splice(index, 1);
    }

    mostrarCarrito();
    actualizarContador();
});

// Función para finalizar la compra
botonFinalizarCompra.addEventListener('click', () => {
    alert('¡Compra finalizada! Gracias por tu compra.');
    carritoItems = [];
    actualizarContador();
    mostrarCarrito();
    carritoModal.style.display = 'none';
});

// Añadir evento a cada tarjeta para mostrar la descripción del producto
tarjetas.forEach((tarjeta, index) => {
    tarjeta.addEventListener('click', () => {
        descripcion.textContent = productos[index].descripcion;
        menuProducto.style.display = 'block';

        const rect = tarjeta.getBoundingClientRect();
        menuProducto.style.left = `${rect.left + window.scrollX}px`;
        menuProducto.style.top = `${rect.top + window.scrollY}px`;
    });
});

// Función para añadir un producto al carrito
agregarCarritoBtn.addEventListener('click', () => {
    const index = productos.findIndex(producto => producto.descripcion === descripcion.textContent);

    if (index >= 0) {
        const productoExistente = carritoItems.find(item => item.nombre === productos[index].nombre);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carritoItems.push({ ...productos[index], cantidad: 1 });
        }
        actualizarContador();
    }
    mostrarCarrito();
    menuProducto.style.display = 'none';
});

// Mostrar/ocultar el menú del carrito
carritoIcono.addEventListener('click', () => {
    carritoModal.style.display = carritoModal.style.display === 'block' ? 'none' : 'block';
});

// Cerrar el menú del carrito si se hace clic fuera de él
document.addEventListener('click', (event) => {
    if (!carritoIcono.contains(event.target) && !carritoModal.contains(event.target)) {
        carritoModal.style.display = 'none';
    }
});

// Evitar que el carrito se cierre al hacer clic dentro de él
carritoModal.addEventListener('click', (event) => {
    event.stopPropagation(); // Esto detiene la propagación del clic hacia el document
});

// Efecto de movimiento al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        carritoIcono.classList.add('scrolled');
    } else {
        carritoIcono.classList.remove('scrolled');
    }
});

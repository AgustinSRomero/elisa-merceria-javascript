class producto {
    constructor(id, categoria, nombre, precio, stock, tipo, img, altImg){
        this.id = id
        this.categoria = categoria
        this.nombre = nombre         
        this.precio = precio 
        this.stock = stock
        this.cantidad = 1
        this.tipo = tipo
        this.img = img
        this.altImg = altImg
    }
}

/* Creo un carrito vacío */
let carrito = []

/* Declaro constantes del dom para utilizarlas */
const contenedorProductos = document.querySelector('#products-container')

const cantidadProductos = document.querySelector("#cantidad-productos")

const carritoNotificacion = document.querySelector('#carrito-notification')

const vaciarCarrito = document.querySelector('#vaciar-carrito')

const precioTotal = document.querySelector('#precio-total')

const finalizarCompra = document.querySelector('#finalizar-compra')

const aplicarFiltros = document.querySelector('#apply-filters')
const limpiarFiltros = document.querySelector("#clean-filters")
const hilos = document.getElementById("hilos")
const cintas = document.getElementById("cintas")
const agujas = document.getElementById("agujas")


// Me fijo si hay un carrito guardado en el local storage y lo renderizo
document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()
})

// funcion para renderizar productos
function renderizarProductos(products){
    contenedorProductos.innerHTML = ""    

    products.forEach((prod) => {
        const {id, nombre, precio, stock, img, altImg} = prod
        const div = document.createElement('div')
        div.classList.add('box-producto')

        div.innerHTML = `
            <img src="${img}" alt="${altImg}">
            <p>${nombre}</p> 
            <p>$${precio}</p>
            <input id="quantity${id}" class="input-quantity" type="number" value="1" min="1" max="${stock}">
            <button onclick="agregarProducto(${id}, ${precio}, cantidadProducto(${id}))" class="button-catalogo">Añadir al Carrito</button>
        `
        //En el boton tengo el evento onclick que activa la funcion que agrega al carrito con dos parametros, producto id y cantidad producto
        contenedorProductos.appendChild(div)

        
    })
    cantidadProductos.innerHTML = products.length + " productos"
}

// Renderizo todos los productos de la tienda
function traerProductos(){
    fetch('../javascript/productos.json')
        .then(response => response.json())
        .then(arrayProductos => renderizarProductos(arrayProductos))
}
traerProductos()

//Funcion para obtener el valor de cantidad que ingreso el usuario
function cantidadProducto(id){
    let identificacion = "#quantity" + id
    let input = document.querySelector(identificacion)
    let quantity = Number(input.value)
    return quantity
}

//Funcion que agrega los items al carrito
function agregarProducto(id, precio, cantidad){
    fetch('../javascript/productos.json')
        .then(response => response.json())
        .then((arrayProductos) => {
            const item = arrayProductos.find((producto) => producto.id === id)
            const validar = carrito.some((prod) => prod.id === id)

            if(validar){
                const prodCarrito = carrito.find((prod) => prod.id === id)
                prodCarrito.cantidad = prodCarrito.cantidad + cantidad
                //Calculo el precio cuando tengo el producto en el carrito
                prodCarrito.precio = prodCarrito.precio + (precio * cantidad)
            }else{
                //Seteo cantidad y precio
                item.cantidad = cantidad
                item.precio = precio * cantidad
            
            carrito.push(item)
        }

        mostrarCarrito() 
    })
}

// Funcion que renderiza el carrito
const mostrarCarrito = () => {
    const carritoContainer = document.querySelector('.modal-body')
    
    carritoContainer.innerHTML = ''
    
    if(carrito.length === 0){
        carritoContainer.innerHTML = `<p class="text-center">Todavia no agregaste nada a tu carrito</p>`
    }
    
    carrito.forEach(prod => {
        const {id, nombre, precio, cantidad, img, altImg} = prod

        carritoContainer.innerHTML += `
        <section class="product-carrito-container">
            <div>
                <img class="img-fluid img-carrito" src="${img}" alt="${altImg}">
            </div>
            <div>
                <p>${nombre}</p> 
                <p>Subtotal: $${precio}</p>
                <p>Cantidad: ${cantidad}</p>
            </div>
            <button onclick="eliminarProducto(${id})" type="button" id="quantity-carrito${id}" class="btn-close" aria-label="Close"></button>
        </section>
        `
    });

    carrito.length != 0 ? carritoNotificacion.textContent = carrito.length : carritoNotificacion.textContent = ""
    
    guardarStorage()
    calculoFinal()
}

//Funcion que elimina un producto del carrito cuando se apreta la x
function eliminarProducto (id){
    carrito = carrito.filter((prod) => prod.id !== id)
    mostrarCarrito()
}

//Funcion para vaciar todo el carrito
vaciarCarrito.addEventListener('click', () => {
    carrito = []
    mostrarCarrito()
})

//Funcion que guarda el carrito en el storage
function guardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

//Calculo precio final
function calculoFinal(){
if (carrito.length !== 0) {
        let precioFinal = carrito.reduce((acc, item) => {
            return acc += Number(item.precio)}, 0)
        precioTotal.innerText = `Precio total: $${precioFinal}`
    }else{
        precioTotal.innerText = "Precio total: $0"
    }
}

//Funcionalidad del boton finalizar compra
finalizarCompra.addEventListener('click', () => {
    if (carrito.length !== 0) {
        location.href = "../pages/compra.html"
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Carrito Vacío',
            text: 'Por favor, elija algun producto para poder continuar',
            color: '#596f91',
            background: '#EFEBE4',
            confirmButtonColor: '#918367d2'
        })
    }
})

//Funcion para filtrar los productos dependiendo de que checkbox marque el usuario
aplicarFiltros.addEventListener('click', () => {
    fetch('../javascript/productos.json')
        .then(response => response.json())
        .then((arrayProductos) => {
            let productosFiltrados = []

            if(!hilos.checked && (!cintas.checked && !agujas.checked)){
                productosFiltrados = arrayProductos
            }else{
                if (hilos.checked) {
                    let filtro = arrayProductos.filter((prod) => prod.categoria === "hilos")
                    for (const prod of filtro) {
                        productosFiltrados.push(prod)
                    }
                }
        
                if(cintas.checked){
                    let filtro = arrayProductos.filter((prod) => prod.categoria === "cintas")
                    for (const prod of filtro) {
                        productosFiltrados.push(prod)
                    }
                }
        
                if(agujas.checked){
                    let filtro = arrayProductos.filter((prod) => prod.categoria === "agujas")
                    for (const prod of filtro) {
                        productosFiltrados.push(prod)
                    }
                }
            }
        
            renderizarProductos(productosFiltrados)
        })
    //   
})

// Boton para limpiar los filtros 
limpiarFiltros.addEventListener('click', () => {
    hilos.checked = false
    cintas.checked = false
    agujas.checked = false
    
    traerProductos()
})


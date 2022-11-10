const productos = [
    {id: 1, categoria: "hilos", nombre: "Bobinas", precio: 100, stock: 300, cantidad: 1, tipo: "unidad", img:"../assets/catalogo1.jpg", altImg:"bobinas"},
    {id: 2, categoria: "cierres", nombre: "Cierre reforzado", precio: 150, stock: 100, cantidad: 1, tipo: "unidad", img:"../assets/catalogo2.jpg", altImg:"cierres reforzados"},
    {id: 3, categoria: "cintas", nombre: "Bies angosto", precio: 180, stock: 25, cantidad: 1, tipo: "metro", img:"../assets/catalogo3.jpg", altImg:"bies angosto"},
    {id: 4, categoria: "cintas", nombre: "Cinta mochila", precio: 220, stock: 10, cantidad: 1, tipo: "metro", img:"../assets/catalogo4.jpg", altImg:"cinta mochila ancha"},
    {id: 5, categoria: "hilos", nombre: "Hilo encerado", precio: 300, stock: 40, cantidad: 1, tipo: "unidad", img:"../assets/catalogo5.jpg", altImg:"hilo encerado"},
    {id: 6, categoria: "cierres", nombre: "Cierre metal", precio: 210, stock: 150, cantidad: 1, tipo: "unidad", img:"../assets/catalogo6.jpg", altImg:"cierre metal"},
    {id: 7, categoria: "agujas", nombre: "Aguja plástica", precio: 25, stock: 25, cantidad: 1, tipo: "unidad", img:"../assets/catalogo7.jpg", altImg:"agujas plásticas"},
    {id: 8, categoria: "pegamentos", nombre: "Pegamil", precio: 380, stock: 10, cantidad: 1, tipo: "unidad", img:"../assets/catalogo8.jpg", altImg:"pegamento pegamil"},
    {id: 9, categoria: "hilos", nombre: "Cono de nylon", precio: 500, stock: 50, cantidad: 1, tipo: "unidad", img:"../assets/catalogo9.jpg", altImg:"cono de nylon"},
    {id: 10, categoria: "manualidades", nombre: "Pompones", precio: 250, stock: 15, cantidad: 1, tipo: "metro", img:"../assets/catalogo10.jpg", altImg:"cinta de pompones"},
    {id: 11, categoria: "hilos", nombre: "Cono MH", precio: 400, stock: 160, cantidad: 1, tipo: "unidad", img:"../assets/catalogo11.jpg", altImg:"conos hilo polyester mh"},
    {id: 12, categoria: "puntilla", nombre: "Puntilla crudo", precio: 320, stock: 10, cantidad: 1, tipo: "metro", img:"../assets/catalogo12.jpg", altImg:"puntilla color crudo"},
    {id: 13, categoria: "cintas", nombre: "Cinta raso motivo", precio: 110, stock: 40, cantidad: 1, tipo: "metro", img:"../assets/catalogo13.jpg", altImg:"cinta razo con lunares"},
    {id: 14, categoria: "alfileres", nombre: "Rueda alfileres", precio: 160, stock: 12, cantidad: 1, tipo: "unidad", img:"../assets/catalogo14.jpg", altImg:"rueda de alfileres"},
    {id: 15, categoria: "agujas", nombre: "Enhebradores", precio: 15, stock: 30, cantidad: 1, tipo: "unidad", img:"../assets/catalogo15.jpg", altImg:"enhebradores plásticos y chapa"},
    {id: 16, categoria: "cintas", nombre: "Cinta raso arcoiris", precio: 100, stock: 25, cantidad: 1, tipo: "metro", img:"../assets/catalogo16.jpg", altImg:"cinta raso de arcoiris"},
]

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

let carrito = []

const contenedorProductos = document.querySelector('#products-container')

const carritoNotificacion = document.querySelector('#carrito-notification')

const vaciarCarrito = document.querySelector('#vaciar-carrito')

const precioTotal = document.querySelector('#precio-total')

const finalizarCompra = document.querySelector('#finalizar-compra')

// Me fijo si hay un carrito guardado en el local storage y lo renderizo
document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()
})

// Renderizo todos los productos de la tienda
productos.forEach((prod) => {
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

//Funcion para obtener el valor de cantidad que ingreso el usuario
function cantidadProducto(id){
    let identificacion = "#quantity" + id
    let input = document.querySelector(identificacion)
    let quantity = Number(input.value)
    return quantity
}

//Funcion que agrega los items al carrito
function agregarProducto(id, precio, cantidad){
    const item = productos.find((producto) => producto.id === id)
    const validar = carrito.some((prod) => prod.id === id)

    if(validar){
        const prodCarrito = carrito.find((prod) => prod.id === id)
        prodCarrito.cantidad = prodCarrito.cantidad + cantidad
        //Calculo precio cuando tengo productos en el carrito
        prodCarrito.precio = prodCarrito.precio + (precio * cantidad)
        
    }else{
        //Seteo cantidad y precio
        item.cantidad = cantidad
        item.precio = precio * cantidad
        
        carrito.push(item)
    }
    
    mostrarCarrito() 
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
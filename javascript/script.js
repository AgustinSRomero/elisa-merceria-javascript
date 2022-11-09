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
        this.tipo = tipo
        this.img = img
        this.altImg = altImg
    }
}

let carrito = []

const contenedorProductos = document.querySelector('#products-container')

const carritoNotificacion = document.getElementsByClassName('carrito-notification')

document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()
})

productos.forEach((prod) => {
    const {id, nombre, precio, stock, img, altImg} = prod
    const div = document.createElement('div')
    div.classList.add('box-producto')

    div.innerHTML = `
        <img src="${img}" alt="${altImg}">
        <p>${nombre}</p> 
        <p>$${precio}</p>
        <input id="quantity" class="input-quantity" type="number" placeholder="1" min="1" max="${stock}">
        <button onclick="agregarProducto(${id})" class="button-catalogo">Añadir al Carrito</button>
    `
    contenedorProductos.appendChild(div)
})

function agregarProducto(id){
    console.log(valor)
    const item = productos.find((producto) => producto.id === id)
    carrito.push(item)
    mostrarCarrito() 
}

const mostrarCarrito = () => {
    const carritoContainer = document.querySelector('.modal-body')
    
    carritoContainer.innerHTML = ''
    carrito.forEach(prod => {
        const {id, nombre, precio, cantidad, img, altImg} = prod

        carritoContainer.innerHTML += `
        <section class="product-carrito-container">
            <div>
                <img class="img-fluid img-carrito" src="${img}" alt="${altImg}">
            </div>
            <div>
                <p>${nombre}</p> 
                <p>$${precio}</p>
                <input class="input-quantity" type="number" value="${cantidad}">
            </div>
            <button onclick="eliminarProducto(${id})" type="button" class="btn-close" aria-label="Close"></button>
        </section>
        `
    });

    guardarStorage()
}

function eliminarProducto (id){
    carrito = carrito.filter((prod) => prod.id !== id)
    mostrarCarrito()
}

function guardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
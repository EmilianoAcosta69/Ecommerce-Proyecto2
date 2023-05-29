// let listaProductos = [];
let listaProductos = JSON.parse(localStorage.getItem('listaProductos')) || []


const producto = {
    id: '',
    codigo: '',
    nombre: '',
    precio: '',
    categoria: '',
    imagen: '',
    descripcion: '',
    cantidad: ''
}

let editando = false;

const formCargarProducto = document.querySelector('#formCargarProducto');
const codigoInput = document.querySelector('#codigoProducto');
const nombreInput = document.querySelector('#nombreProducto');
const precioInput = document.querySelector('#precioProducto');
const categoriaSelect = document.querySelector('#categoriaProducto')
const imagenInput = document.querySelector("#urlImagen");
const descripcionInput = document.querySelector('#descripcionProducto')
const cantidadInput = document.querySelector('#cantidadProducto');

const btnAgregar = document.querySelector('#btnAgregar');

formCargarProducto.addEventListener('submit', validarFormulario);

function validarFormulario(event) {
    event.preventDefault();

    if(codigoInput.value === '' || nombreInput.value === '' || precioInput.value === '' || categoriaSelect.value === '' ||imagenInput.value === '' || descripcionInput.value === '' || cantidadInput.value === ''  ){
        alertMensaje1('Todos los campos son obligatorios.');
        return;
    }

    if(editando){
        editarProducto();
        editando = false;
    }else{
        producto.id = Date.now();
        producto.codigo = codigoInput.value;
        producto.nombre = nombreInput.value;
        producto.precio = precioInput.value;
        producto.categoria = categoriaSelect.value;
        producto.imagen = imagenInput.value;
        producto.cantidad = cantidadInput.value;
        producto.descripcion = descripcionInput.value;
        

        agregarProducto();
        
    }

}

function agregarProducto(){

    listaProductos.push({...producto});
    localStorage.setItem('listaProductos',JSON.stringify(listaProductos));
    mostrarProductos();
    formCargarProducto.reset();
    limpiarProducto();
    
    
}

function limpiarProducto(){
    producto.id = '';
    producto.codigo = '';
    producto.nombre = '';
    producto.precio = '';
    producto.categoria = '';
    producto.imagen = '';
    producto.descripcion = '';
    producto.cantidad = '';
    
}

function mostrarProductos(){

    limpiarHTML();

    const divProductos = document.querySelector('.div-productos');
    
    listaProductos?.forEach( productos => {
        const {id,codigo,nombre,precio,cantidad} = productos;

        const fila = document.createElement('tr');
        const celdas = `
        <td>${codigo} </td>
        <td>${nombre} </td> 
        <td>$${precio}</td>  
        <td>${cantidad} </td>
        
        `;

        fila.innerHTML = celdas;
        divProductos.append(fila);
        fila.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarProducto(productos);
        editarBoton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editarBoton.classList.add('btn','btn-Editar', 'btn-outline-warning','text-dark','mx-2');
        fila.appendChild(editarBoton);
        
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarProducto(id);
        eliminarBoton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        eliminarBoton.classList.add('btn', 'btn-Eliminar','btn-outline-danger','text-dark');
        fila.appendChild(eliminarBoton);

        divProductos.appendChild(fila);

        console.log(JSON.stringify(producto))
        let productoBack = JSON.stringify(producto);
        console.log(productoBack);

        let productoLista = JSON.parse(productoBack);
        console.log(productoLista);

        // Guardar en el Local Storage

        localStorage.setItem('codigo',`${codigo}`)
        localStorage.setItem('Nombre',`${nombre}`)
        localStorage.setItem('Precio',`${precio}`)
        localStorage.setItem('cantidad',`${cantidad}`)

        // Traer el valor del Local Storage

        console.log(localStorage.getItem('codigo')) ;
        console.log(localStorage.getItem('Nombre')) ;
        console.log(localStorage.getItem('Precio')) ;
        console.log(localStorage.getItem('cantidad')) ;
        
        
});
}

mostrarProductos();


function cargarProducto(productos){
    const {id,codigo,nombre,precio,imagen,categoria,cantidad,descripcion} = productos;
    
    codigoInput.value = codigo;
    nombreInput.value = nombre;
    precioInput.value = precio;
    imagenInput.value = imagen;
    categoriaSelect.value = categoria;
    cantidadInput.value = cantidad;
    descripcionInput.value = descripcion;
    
    producto.id = id;
    
    formCargarProducto.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

function editarProducto(){

    producto.codigo = codigoInput.value;
    producto.nombre = nombreInput.value;
    producto.precio = precioInput.value;
    producto.imagen = imagenInput.value;
    producto.categoria = categoriaSelect.value;
    producto.cantidad = cantidadInput.value;
    producto.descripcion = descripcionInput.value;

    listaProductos.map( productos =>{
        if(productos.id === producto.id){
            productos.id = producto.id;
            productos.codigo = producto.codigo;
            productos.nombre = producto.nombre;
            productos.precio = producto.precio;
            productos.imagen = producto.imagen;
            productos.categoria = producto.categoria;
            productos.cantidad = producto.cantidad;
            productos.descripcion = producto.descripcion
        }
    });
    localStorage.setItem('listaProductos',JSON.stringify(listaProductos));
    limpiarHTML();
    mostrarProductos();
    formCargarProducto.reset();
    formCargarProducto.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;
}

function eliminarProducto(id){
    listaProductos = listaProductos.filter(productos => productos.id !== id);
    const confirmacion = confirm(`Estas seguro que quieres eliminar este producto?`);
    if(confirmacion == true){
        limpiarHTML();
        mostrarProductos();
    }else{
        return;
    }
    localStorage.setItem('listaProductos',JSON.stringify(listaProductos));
}
    

function limpiarHTML(){
    
    const divProductos = document.querySelector('.div-productos');
    while(divProductos.firstChild){
        divProductos.removeChild(divProductos.firstChild);
    }
}

function alertMensaje1(mensaje){
    let alertMensaje = document.createElement('div');
    alertMensaje.classList.add('alert' , 'alert-danger' , 'text-center');
    alertMensaje.setAttribute('role','alert');
    alertMensaje.innerText = mensaje;
    let container = document.querySelector('#formCargarProducto');
    container.appendChild(alertMensaje);
}



// function mostrarProductos1(){
//     const cardProducto = document.createElement('div');
//         cardProducto.id = producto.codigo;

//         cardProducto.classList.add('card','mx-2')
//         cardProducto.style.width = '18rem'
//         cardProducto.innerHTML = `
//         <img src=${imagenInput} class="card-img-top" alt=${nombreInput}>
//         <div class="card-body">
//             <h5 class="card-title text-center">${codigoInput}</h5>
//             <p class="card-text text-center">${descripcionInput}</p>
//             <p class="card-text text-center">$${precioInput}</p>
//             <p class="card-text text-center">$${cantidadInput}</p>
//             <p class="card-text text-center">$${categoriaSelect}</p>
//             <a href="#" class="btn btn-primary d-block" onclick = "agregarCarrito(${producto.codigo})">Agregar al Carrito</a>
//         </div>
//         `; 

//         const padreConteiner = document.querySelector('main');
//         window.location = "principal.html";
//         padreConteiner.appendChild(cardProducto);
// }















































// function agregarProducto(event){
    
//     event.preventDefault();
//     const producto = document.querySelectorAll('#codigoProducto , #nombreProducto,#precioProducto,#urlImagen,#categoriaProducto,#cantidadProducto,#descripcionProducto');
//     const listaProductos = producto.value;
//     const newProducto = document.createElement('div');
//     const id = new Date().getTime()
//     newProducto.id = id;
//     newProducto.innerHTML = `
//     <table>
//     <tr> 
//         <th> Codigo </th>
//         <th> Nombre </th>
//         <th> Precio </th>
//         <th> Cantidad </th>
//     </tr>  
//     <tr> 
//         <td>${listaProductos}</td>
//         <td>${listaProductos}</td>
//     </tr>
//     </table>
//     <button class="btn btn-danger ms-auto m-2 d-block" onclick="eliminarProducto()"> Eliminar </button>
//     `;
//     newProducto.classList.add('text-dark' , 'my-2' , 'p-3' ,"rounded")
//     const contenedorProductos = document.querySelector('.contenedorProductos');
//     contenedorProductos.appendChild(newProducto);
//     document.querySelector('form').reset();
// }



// function eliminarProducto(id){
//     const productoEliminado = document.getElementById(id);
//     productoEliminado.remove();
// }









// const formulario = document.getElementById("formCargarProducto");
// const contenedor = document.getElementById("contenedorProductos");
// const alert = document.getElementsByClassName("alert");

// let listaProductos = [];

// const cargarProducto = (codigo,nombre,precio,categoria,imagen,descripcion,cantidad) => {

//     let producto = {
//         codigo: codigo,
//         nombre: nombre,
//         precio: precio,
//         categoria: categoria,
//         imagen: imagen,
//         descripcion: descripcion,
//         cantidad: cantidad,
//     }
//     listaProductos.push(producto);
//     return producto;

// }

// const guardarDatos = () => {
//     localStorage.setItem("productos",JSON.stringify(listaProductos))
//     mostrarDatos();
// }





// formulario.addEventListener("submit",(e)=>{
//     e.preventDefault();

//     let codigoProducto = document.getElementById("codigoProducto").value;
//     let nombreProductoInput = document.getElementById("nombreProducto").value;
//     let precioProductoInput = document.getElementById("precioProducto").value;
//     let categoriaProductoInput = document.getElementById("categoriaProducto").value;
//     let urlImagenInput = document.getElementById("urlImagen").value;
//     let descripcionProductoInput = document.getElementById("descripcionProducto").value;
//     let cantidadProductoInput = document.getElementById("cantidadProducto").value;

//     cargarProducto(codigoProducto,nombreProductoInput,precioProductoInput,categoriaProductoInput,urlImagenInput,descripcionProductoInput,cantidadProductoInput)
//     guardarDatos();
//     formulario.reset();
// })

// document.addEventListener("DOMContentLoaded", mostrarDatos());


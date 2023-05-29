// // let listaProductos = JSON.parse(localStorage.getItem('listaProductos')) || []


// class Producto{
//     constructor(codigo,nombre,precio,imagen,categoria,cantidad,descripcion){
        
//         this.codigo = codigo;
//         this.nombre = nombre;
//         this.precio = precio;
//         this.imagen = imagen;
//         this.categoria = categoria;
//         this.cantidad = cantidad;
//         this.descripcion = descripcion;
//     }
// }

// let productos = [
//     new Producto('Air14','Zapatillas' , 30000 , 'https://2app.kicksonfire.com/kofapp/upload/events_master_images/ipad_air-jordan-14-sport-blue.jpg' , 'categoria',1000 , 'zapatillas de uso diario'),
//     new Producto('Air15','jordan' , 30000 , 'https://4app.kicksonfire.com/kofapp/upload/events_master_images/thumb_ipad_air-jordan-14-hyper-royal.jpg' , 'categoria',1000 , 'zapatillas de uso diario'),
//     new Producto('Air16','tillas' , 30000 , 'https://4app.kicksonfire.com/kofapp/upload/events_master_images/thumb_ipad_air-jordan-14-hyper-royal.jpg' , 'categoria',1000 , 'zapatillas de uso diario'),
//     new Producto('Air17','poosad' , 30000 , 'https://4app.kicksonfire.com/kofapp/upload/events_master_images/thumb_ipad_air-jordan-14-hyper-royal.jpg' , 'categoria',1000 , 'zapatillas de uso diario')

// ]

// let carrito = JSON.parse(localStorage.getItem('carrito')) || []


// document.addEventListener("keyup",e=>{

//     if(e.target.matches("#buscador")){
//         document.querySelectorAll(".articulo").forEach(elemento =>{
//             elemento.textContent.toLowerCase().includes(e)
//         })
//     }
// })






function mostrarProductos(){

    limpiarHTML();

    const divProductos = document.querySelector('.div-productos');
    
    listaProductos?.forEach( productos => {
        const {id,codigo,nombre,precio,categoria,imagen,descripcion,cantidad} = productos;

        const newProductoCard= document.createElement('div');
        newProductoCard.id = producto.codigo;
        //Agregamos la informacion
        newProductoCard.classList.add('card','mx-2','d-flex','flex-d-col','justify-content-evenly');
        newProductoCard.style.width = '18rem'
        newProductoCard.innerHTML = 
        `
        <img src=${imagen} class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title text-center">${nombre}</h5>
            <p class="card-text text-center">${descripcion}</p>
            <p class="card-text text-center">$${precio}</p>
            <a href="#" class="btn btn-primary d-block" onclick = "agregarCarrito(${producto.codigo})">Agregar al Carrito</a>
        </div>
        `; 
        //Buscamos al padre
        const padreConteiner = document.querySelector('.div-productos');
        //Adoptamos al hijo
        padreConteiner.appendChild(newProductoCard);

        // <td>${codigo} </td>
        // <td>${nombre} </td> 
        // <td>$${precio}</td>  
        // <td>${categoria} </td>
        // <td>${imagen} </td> 
        // <td>$${descripcion}</td>  
        // <td>${cantidad} </td>
        
        // `;

        
        divProductos.append(newProductoCard);
        newProductoCard.dataset.id = id;

        // const editarBoton = document.createElement('button');
        // editarBoton.onclick = () => cargarProducto(productos);
        // editarBoton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        // editarBoton.classList.add('btn','btn-Editar', 'btn-outline-warning','text-dark','mx-2');
        // fila.appendChild(editarBoton);
        
        // const eliminarBoton = document.createElement('button');
        // eliminarBoton.onclick = () => eliminarProducto(id);
        // eliminarBoton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        // eliminarBoton.classList.add('btn', 'btn-Eliminar','btn-outline-danger','text-dark');
        // fila.appendChild(eliminarBoton);

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
        localStorage.setItem('Categoria',`${categoria}`)
        localStorage.setItem('Imagen',`${imagen}`)
        localStorage.setItem('Descripcion',`${descripcion}`)
        localStorage.setItem('cantidad',`${cantidad}`)

        // Traer el valor del Local Storage

        
        
        
});
}

mostrarProductos();
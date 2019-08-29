//Codigo para generar información de categorias y almacenarlas en un arreglo.
var categorias = [];
(()=>{
  //Este arreglo es para generar textos de prueba
  let textosDePrueba=[
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
      "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
      "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
      "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
      "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
  ]
  
  //Genera dinamicamente los JSON de prueba para esta evaluacion,
  //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

  
  let contador = 1;
  for (let i=0;i<5;i++){//Generar 5 categorias
      let categoria = {
          nombreCategoria:"Categoria "+i,
          descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
          aplicaciones:[]
      };
      for (let j=0;j<10;j++){//Generar 10 apps por categoria
          let aplicacion = {
              codigo:contador,
              precio:(Math.random() * 5).toFixed(2),
              nombre:"App "+contador,
              descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
              icono:`img/app-icons/${contador}.webp`,
              instalada:contador%3==0?true:false,
              app:"app/demo.apk",
              calificacion:Math.floor(Math.random() * (5 - 1)) + 1,
              descargas:1000,
              desarrollador:`Desarrollador ${(i+1)*(j+1)}`,
              imagenes:["img/app-screenshots/1.webp","img/app-screenshots/2.webp","img/app-screenshots/3.webp"],
              comentarios:[
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Juan"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Pedro"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Maria"},
              ]
          };
          contador++;
          categoria.aplicaciones.push(aplicacion);
      }
      categorias.push(categoria);
  }
  
  console.log(categorias);
})();

var db;

(()=>{
    if (!'indexeddb' in window)
        console.log("No soporta indexedDB"); 
    
    var solicitud = window.indexedDB.open('appstore',1);
    solicitud.onsuccess = function(evento){
        db = solicitud.result;
        console.log('Base de datos creada o abierta');
        //imprimirAplicaciones();
        llenarCategorias();
    };

    solicitud.onupgradeneeded = function(evento){
        db = evento.target.result;
        let objectStoreCategorias = db.createObjectStore('categorias',{keyPath:'codigo',autoIncrement:true});
        objectStoreCategorias.transaction.oncomplete = function(evento){
            console.log('Se creo el object store de categorias');
            for (let i = 0; i < categorias.length; i++) {
                guardarCategoria(categorias[i]);
            }
        }

        objectStoreCategorias.transaction.onerror = function(evento){
            console.log(evento);
        }
    };
})();

function guardarCategoria(categoria){
    let transaccion = db.transaction(['categorias'],'readwrite'); 
    let objectStoreCategorias = transaccion.objectStore('categorias');
    let solicitud = objectStoreCategorias.add(categoria);
    solicitud.onsuccess = function(evento){
        console.log('Se agrego el registro con exito');
    }

    solicitud.onerror = function(evento){
        console.log(evento);
    }
}

function llenarCategorias(){
    let transaccion = db.transaction(['categorias'],'readonly');
    let objectStoreCategorias = transaccion.objectStore('categorias');
    let cursor = objectStoreCategorias.openCursor();
    cursor.onsuccess = function(evento){
        //Se ejecuta por cada registro en el objectstore
        if (evento.target.result){
            console.log(evento.target.result);
            let categoria = evento.target.result.value;
            $('#categoria').append(`<option value="${evento.target.result.key}">${categoria.nombreCategoria}</option>`);
            evento.target.result.continue(); 
        }
        
    }
}

////No se esta ejecutando: Imprime toooooooodas las aplicaciones, sin importar la categoria
/*
function imprimirAplicaciones(){
    let transaccion = db.transaction(['categorias'],'readonly');
    let objectStoreCategorias = transaccion.objectStore('categorias');
    let cursor = objectStoreCategorias.openCursor();
    cursor.onsuccess = function(evento){
        //Se ejecuta por cada registro en el objectstore
        if (evento.target.result){
            console.log(evento.target.result);
            let categoria = evento.target.result.value;
            for (let i = 0; i < categoria.aplicaciones.length; i++) {
                let aplicacion = categoria.aplicaciones[i];
                $('#aplicaciones').append(
                    `<div class="col-lg-2 col-md-3 col-6">
                        <div class="card" onclick="detalleAplicacion(${aplicacion.codigo})">
                            <div class="card-body">
                                <img src="${aplicacion.icono}" class="img-fluid">
                                <div class="texto-app">${aplicacion.nombre}</div>
                                <div class="texto-desarrollador">${aplicacion.desarrollador}</div>
                                <div class="estrellas">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                </div>
                                <div class="texto-precio">
                                    ${aplicacion.precio}
                                </div>
                            </div>
                        </div>
                    </div>`
                );    
            }
            

            evento.target.result.continue(); //Mover el cursor a la siguiente direccion de memoria
        }
    }
}*/

//Imprime las aplicaciones de la categoria seleccionada
function mostrarAplicaciones(){
    console.log("Categoria seleccionada: "+$("#categoria").val());
    $('#aplicaciones').html(null);
    let transaccion = db.transaction(['categorias'],'readonly');
    let objectStoreCategorias = transaccion.objectStore('categorias');
    let solicitud = objectStoreCategorias.get(parseInt($("#categoria").val()));
    solicitud.onsuccess = function(evento){
        let categoria = evento.target.result;
        for (let i = 0; i < categoria.aplicaciones.length; i++) {
            let aplicacion = categoria.aplicaciones[i];
            let estrellas = '';
            for (let i = 0; i < aplicacion.calificacion; i++) {
                estrellas += '<i class="fas fa-star"></i>';
            }
            for (let i = 0; i < 5-aplicacion.calificacion; i++) {
                estrellas += '<i class="far fa-star"></i>';
            }
            $('#aplicaciones').append(
                `<div class="col-lg-2 col-md-3 col-6">
                    <div class="card" onclick="detalleAplicacion(${aplicacion.codigo})">
                        <div class="card-body">
                            <img src="${aplicacion.icono}" class="img-fluid">
                            <div class="texto-app">${aplicacion.nombre}</div>
                            <div class="texto-desarrollador">${aplicacion.desarrollador}</div>
                            <div class="estrellas">
                                ${estrellas}
                            </div>
                            <div class="texto-precio">
                                ${aplicacion.precio}
                            </div>
                        </div>
                    </div>
                </div>`
            );    
        }
    }
}


function detalleAplicacion(codigoAplicacion){
    console.log('Mostrar detalle de la aplicacion: ' + codigoAplicacion);
    $('#detalle-aplicacion').modal('show');
    let transaccion = db.transaction(['categorias'],'readonly');
    let objectStoreCategorias = transaccion.objectStore('categorias');
    let solicitud = objectStoreCategorias.get(parseInt($("#categoria").val()));
    solicitud.onsuccess = function(evento){
        let categoria = evento.target.result;
        for (let i = 0; i < categoria.aplicaciones.length; i++) {
            let aplicacion = categoria.aplicaciones[i];
            if (aplicacion.codigo==codigoAplicacion){
                console.log('Aplicacion a visualizar');
                console.log(aplicacion);
                $('#nombre-app').html(aplicacion.nombre);
                $('#imagen-app').attr('src',aplicacion.icono);
                $('#desarrollador-app').html(aplicacion.desarrollador);
                $('#descripcion-app').html(aplicacion.descripcion);
                $('#precio-app').html(aplicacion.precio<0.5?'FREE':'$'+aplicacion.precio);
            }
        }
    }
}
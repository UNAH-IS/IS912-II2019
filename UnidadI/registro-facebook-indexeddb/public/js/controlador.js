/*
Modelo: Logica de negocio y los datos (BD, Backend)
Vista: Lo que el usuario ve UI (HTML, CSS)
Controlador: Controlar y responder las acciones del usuario (Javascript)

Angular, VueJS, React
NodeJS, Express, Gestor de vistas EJS, Pug(Jade)
*/
var db;

(()=>{
    if (!('indexedDB' in window)) 
        console.log('Este navegador no soporta indexedDB');
    
        //Si la base de datos no existe la crea, sino solo la abre.
        let solicitud = window.indexedDB.open('facebook',1);  //Asincrona
        
        solicitud.onsuccess = function(evento){
            console.log("Se creó o abrió la BD");
            db = solicitud.result;
            llenarTabla();
        }

        solicitud.onerror = function(evento){
            console.log(evento);
        }

        //Se ejecuta cuando se crea o se necesita actualizar la BD
        solicitud.onupgradeneeded = function(evento){
            //En este punto si se podria crear las colecciones
            console.log('Se creo o actualizó la BD');
            let db = evento.target.result;
            //Las colecciones en IndexedDB se les llama ObjectStores
            let objectStoreUsuarios = db.createObjectStore('usuarios',{keyPath:'codigo', autoIncrement:true});
            objectStoreUsuarios.transaction.oncomplete = function(evento){
                console.log('Se creo el object store de usuarios');
            }

            objectStoreUsuarios.transaction.onerror = function(evento){
                console.log(evento);
            }
        }
        
})();

var campos = [
    {id:'first-name', valido:false},
    {id:'last-name', valido:false},
    {id:'email', valido:false},
    {id:'password', valido:false},
    {id:'month', valido:false},
    {id:'day', valido:false},
    {id:'year', valido:false}
];

let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];

for (let i=0;i<months.length; i++)
    document.getElementById('month').innerHTML += `<option value="${i}">${months[i]}</option>`;

for (let i=1;i<=31; i++)
    document.getElementById('day').innerHTML += `<option value="${i}">${i}</option>`;


let anio = new Date().getFullYear();
for (let i=anio;i>=(anio-100); i--)
    document.getElementById('year').innerHTML += `<option value="${i}">${i}</option>`;

function registrarUsuario(){
    for (let i = 0; i<campos.length; i++)
        campos[i].valido = validarCampoVacio(campos[i].id);
    
    console.log(campos);
    for (let i = 0; i<campos.length; i++)
        if (!campos[i].valido)
            return
    

    let genderInput = document.querySelector('input[type="radio"][name="gender"]:checked');
    
    let persona = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        gender: (genderInput==null)?"":genderInput.value, 
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        birthdate: {
            month: document.getElementById('month').value,
            day: document.getElementById('day').value,
            year: document.getElementById('year').value
        }
    }
    
    //Agregar al ObjectStore de usuarios
    let transaccion = db.transaction(['usuarios'],'readwrite'); //readonly: Solo lectura, readwrite:lectura y escritura
    let objectStoreUsuarios = transaccion.objectStore('usuarios');
    let solicitud = objectStoreUsuarios.add(persona);
    solicitud.onsuccess = function(evento){
        console.log('Se agrego el registro con exito');
        console.log(evento);
        anexarFilaTabla(persona, evento.target.result);
        document.getElementById('resultado').style.display = "block";
    }

    solicitud.onerror = function(evento){
        console.log(evento);
    }
}



function validarCampoVacio(id){
    let resultado = (document.getElementById(id).value=="")?false:true;
    marcarInput(id,resultado);
    return resultado; 
    
}


function validarCorreo(correo) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let resultado = re.test(correo.value);
    marcarInput(correo.id, resultado);
    return resultado;
}

function marcarInput(id, valido){
    if (valido){
        document.getElementById(id).classList.remove('is-invalid');
        document.getElementById(id).classList.add('is-valid');
    }else{
        document.getElementById(id).classList.remove('is-valid');
        document.getElementById(id).classList.add('is-invalid');
    }
}


function llenarTabla(){
    document.getElementById('tabla-registros').innerHTML = '';
    let transaccion = db.transaction(['usuarios'],'readonly');
    let objectStoreUsuarios = transaccion.objectStore('usuarios');
    let cursor = objectStoreUsuarios.openCursor();
    cursor.onsuccess = function(evento){
        //Se ejecuta por cada registro en el objectstore
        if (evento.target.result){
            console.log(evento.target.result);
            anexarFilaTabla(evento.target.result.value, evento.target.result.key);
            evento.target.result.continue(); //Mover el cursor a la siguiente direccion de memoria
        }
    }
}

function anexarFilaTabla(persona, keyPath){
    document.getElementById('tabla-registros').innerHTML += 
                    `<tr>
                        <td>${persona.firstName}</td>
                        <td>${persona.lastName}</td>
                        <td>${persona.email}</td>
                        <td>${persona.gender}</td>
                        <td>${persona.password}</td>
                        <td>${persona.birthdate.day}/${persona.birthdate.month}/${persona.birthdate.year}</td>
                        <td><button type="button" onclick="eliminar(${keyPath})"><i class="fas fa-trash-alt"></i></button></td>
                        <td><button type="button" onclick="editar(${keyPath})"><i class="fas fa-edit"></i></button></td>
                    </tr>`;
}

function eliminar(key){
    let transaccion = db.transaction(['usuarios'],'readwrite');
    let objectStoreUsuarios = transaccion.objectStore('usuarios');
    let solicitud = objectStoreUsuarios.delete(key);
    solicitud.onsuccess = function(){
        console.log('Se elimino el registro');
        llenarTabla();
    }    
}

function editar(key){
    console.log("Editar registro "+key+", en este caso deberia obtener el JSON del LocalStorage y de sus valores llenar los input del formulario, cambiar el boton por uno que diga actualizar y sustituir el json del LocalStorage por la informacion actualizada");
    let transaccion = db.transaction(['usuarios'],'readonly');
    let objectStoreUsuarios = transaccion.objectStore('usuarios');
    let solicitud = objectStoreUsuarios.get(key);
    solicitud.onsuccess = function(evento){
        console.log(evento.target.result);
    }
}
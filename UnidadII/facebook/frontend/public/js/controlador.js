$(document).ready(function(){
    //Ya cargó el DOM
    llenarTabla();
});

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

function validarCampos(){
    for (let i = 0; i<campos.length; i++)
        campos[i].valido = validarCampoVacio(campos[i].id);
    
    console.log(campos);
    for (let i = 0; i<campos.length; i++)
        if (!campos[i].valido)
            return;
    
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

    return persona;
}

function registrarUsuario(){
    let persona = validarCampos();
    if (persona==null || persona == undefined)
        return;
    

    //Guardar en el servidor
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
    $.ajax({
        url:'http://localhost:8888/usuarios/',
        method:'GET',
        dataType:'json',
        success:(res)=>{
            console.log('Success');
            console.log(res);
        },
        error:(error)=>{
            console.log('Error');
            console.error(error);
        }
    });
}

function anexarFilaTabla(persona, id){
    document.getElementById('tabla-registros').innerHTML += 
                    `<tr>
                        <td>${persona.firstName}</td>
                        <td>${persona.lastName}</td>
                        <td>${persona.email}</td>
                        <td>${persona.gender}</td>
                        <td>${persona.password}</td>
                        <td>${persona.birthdate.day}/${persona.birthdate.month}/${persona.birthdate.year}</td>
                        <td><button type="button" onclick="eliminar(${id})"><i class="fas fa-trash-alt"></i></button></td>
                        <td><button type="button" onclick="editar(${id})"><i class="fas fa-edit"></i></button></td>
                    </tr>`;
}

function eliminar(id){
    
}

function editar(id){
    console.log("Editar registro "+key+", en este caso deberia obtener el JSON del LocalStorage y de sus valores llenar los input del formulario, cambiar el boton por uno que diga actualizar y sustituir el json del LocalStorage por la informacion actualizada");
    document.getElementById('key').value=key;
    
    
    /*    document.getElementById('first-name').value = persona.firstName;
        document.getElementById('last-name').value = persona.lastName;
        document.getElementById('email').value = persona.email;
        document.getElementById('password').value = persona.password;
        document.getElementById('month').value = persona.birthdate.month;
        document.getElementById('day').value = persona.birthdate.day;
        document.getElementById('year').value = persona.birthdate.year;

        let opcionesGenero = document.querySelectorAll('input[type="radio"][name="gender"]');
        for(let i=0; i<opcionesGenero.length;i++){ 
            if (opcionesGenero[i].value == persona.gender){
                opcionesGenero[i].checked = true;
            }
        }

        document.getElementById('boton-update').style.display = 'block';
        document.getElementById('boton-clear').style.display = 'block';
        document.getElementById('boton-sign-in').style.display = 'none';
        */
    
}

function limpiar(){
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('month').value = '';
    document.getElementById('day').value = '';
    document.getElementById('year').value = '';

    document.getElementById('boton-update').style.display = 'none';
    document.getElementById('boton-clear').style.display = 'none';
    document.getElementById('boton-sign-in').style.display = 'block';
}

function actualizarUsuario(){
    let persona = validarCampos();
    console.log(persona);
    
}
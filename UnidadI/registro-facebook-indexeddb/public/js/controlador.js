var localStorage = window.localStorage;
llenarTabla();

var campos = [
    {id:'first-name', valido:false},
    {id:'last-name', valido:false},
    {id:'email', valido:false},
    {id:'password', valido:false},
    {id:'month', valido:false},
    {id:'day', valido:false},
    {id:'year', valido:false}
];

var registros = []; //global

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
    registros.push(persona);
    //--------------
    let key = localStorage.key(localStorage.length) + 1;
    localStorage.setItem(key,JSON.stringify(persona));
    
    //---------------

    anexarFilaTabla(persona, key);
    document.getElementById('resultado').style.display = "block";
    console.log(registros);
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
    document.getElementById('tabla-registros').innerHTML = "";
    for (let i=0; i<localStorage.length;i++){
        let key = localStorage.key(i);
        anexarFilaTabla(JSON.parse(localStorage.getItem(key)),key);
    }
}

function anexarFilaTabla(persona, key){
    document.getElementById('tabla-registros').innerHTML += 
                    `<tr>
                        <td>${persona.firstName}</td>
                        <td>${persona.lastName}</td>
                        <td>${persona.email}</td>
                        <td>${persona.gender}</td>
                        <td>${persona.password}</td>
                        <td>${persona.birthdate.day}/${persona.birthdate.month}/${persona.birthdate.year}</td>
                        <td><button type="button" onclick="eliminar(${key})"><i class="fas fa-trash-alt"></i></button></td>
                        <td><button type="button" onclick="editar(${key})"><i class="fas fa-edit"></i></button></td>
                    </tr>`;
}

function eliminar(key){
    console.log("Eliminar registro "+key);
    localStorage.removeItem(key);
    llenarTabla();
}

function editar(key){
    console.log("Editar registro "+key+", en este caso deberia obtener el JSON del LocalStorage y de sus valores llenar los input del formulario, cambiar el boton por uno que diga actualizar y sustituir el json del LocalStorage por la informacion actualizada");

}
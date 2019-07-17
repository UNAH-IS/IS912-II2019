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
    if (document.getElementById('first-name').value==""){
        document.getElementById('first-name').classList.remove('is-valid');
        document.getElementById('first-name').classList.add('is-invalid');
        return; //Sale de la funcion y no ejecuta nada
    }else{
        document.getElementById('first-name').classList.remove('is-invalid');
        document.getElementById('first-name').classList.add('is-valid');
    }

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
    document.getElementById('tabla-registros').innerHTML += 
                        `<tr>
                            <td>${persona.firstName}</td>
                            <td>${persona.lastName}</td>
                            <td>${persona.email}</td>
                            <td>${persona.gender}</td>
                            <td>${persona.password}</td>
                            <td>${persona.birthdate.day}/${persona.birthdate.month}/${persona.birthdate.year}</td>
                        </tr>`;
    document.getElementById('resultado').style.display = "block";
    console.log(registros);
}




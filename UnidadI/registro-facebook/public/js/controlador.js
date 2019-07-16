let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];

for (let i=0;i<months.length; i++)
    document.getElementById('month').innerHTML += `<option value="${i}">${months[i]}</option>`;


function registrarUsuario(){
    console.log('first-name: ' + document.getElementById('first-name').value);
    console.log('last-name: ' + document.getElementById('last-name').value);
    console.log('email: ' + document.getElementById('email').value);
    console.log('password: ' + document.getElementById('password').value);
    console.log('month: ' + document.getElementById('month').value);
    console.log('day: ' + document.getElementById('day').value);
    console.log('year: ' + document.getElementById('year').value);


    let persona = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        month: document.getElementById('month').value,
        day: document.getElementById('day').value,
        year: document.getElementById('year').value
    }

    console.log(persona);
}
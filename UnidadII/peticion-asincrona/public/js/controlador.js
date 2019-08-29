function login(){
    //let parametros = `usuario=${$('#usuario').val()}&password=${$('#password').val()}`;
    let parametros = $('#formulario').serialize(); //Retorna el URLEncoded utilizando el name de las etiquetas
    /*var f = new FormData();
    f.append('usuario',document.getElementById('usuario').value);
    f.append('password',document.getElementById('password').value);*/
    console.log(JSON.stringify(f));
    $.ajax({
        url:"/procesar",
        method:"POST", //GET
        processData: false,
        contentType: false,
        data:formData, //URLEncoded
        dataType:'json', //html,text,xml,json (por defecto es html)
        success:function(res){
            console.log('Respuesta del servidor: ');
            console.log(res);
        },
        error:function(error){
            console.error(error);
        }
    });
}
(()=>{
    $.ajax({
        url:'/usuarios/',
        method:'GET',
        dataType:'json',
        success:(res)=>{
            console.log(res);
            for(let i=0; i<res.length;i++){
                $('#usuario-actual').append(`<option value="${res[i]._id}">${res[i].nombre}</option>`);
            }
            $('#usuario-actual').val(null);
        },
        error:(error)=>{
            console.error(error);
        }
    });
})();

$('#usuario-actual').change(function(e){
    console.log('Obtener los post de los amigos de '+ $('#usuario-actual').val());
    $.ajax({
        url:`/usuarios/${$('#usuario-actual').val()}/posts-siguiendo/`,
        method:'GET',
        dataType:'json',
        success:(res)=>{
            console.log(res);
            for(let i=0;i<res.siguiendo.length;i++){
                for(let j=0;j<res.siguiendo[i].posts.length;j++){
                    console.log(res.siguiendo[i].posts[j]);
                }
            }
        },
        error:(error)=>{
            console.error(error);
        }
    });
});

function verHistoria(codigoUsuario, codigoHistoria){
    console.log(`Ver historia ${codigoHistoria} del usuario ${codigoUsuario} `);
    $('#ver-historia').modal('show');
}


function like(codigoPost){
    console.log("Like al post " + codigoPost);
}

function comentar(codigoPost){
    console.log(`Comentar el post ${codigoPost} con el comentario ${$("#comentario-post-"+codigoPost).val()}`);
}
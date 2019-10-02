(()=>{
    $.ajax({
        url:"/usuarios/",
        method:"GET",
        dataType:"json",
        success:(res)=>{
            //console.log(res);
            $("#usuarios-a-seguir").empty();
            for(let i=0;i<res.length;i++){
                //Llenar el select list de usuarios
                $('#usuario-actual').append(`<option value="${res[i]._id}">${res[i].nombre}</option>`);

                //Llenar la lista de usuarios de la ventana modal para cuando quiera seguir más usuarios
                $("#usuarios-a-seguir").append(
                    `<div class="px-1 py-2 story-card">
                        <div class="fl">
                        <img class="img-fluid img-thumbnail rounded-circle" src="${res[i].imagen}">
                        </div>  
                        <div class="py-1 px-1 fl">
                        <small class="mr-md-auto"><b>${res[i].nombre}</b></small>
                        <button onclick="seguirUsuario('${res[i]._id}');" class="btn btn-outline-danger btn-sm"><i class="fas fa-user-plus"></i></button><br>
                        </div>
                    </div>`
                );
            }
            $('#usuario-actual').val(null);
        },
        error:(error)=>{
            console.error(error);
        }

    });
})();


$('#usuario-actual').change(function(e){
    obtenerPosts();
    obtenerUsuariosSiguiendo();
    obtenerUsuariosSeguidores();    
});

function obtenerPosts(){
    //Obtener todos los posts de los usuarios que esta siguiendo
    $.ajax({
        url:`/usuarios/${$('#usuario-actual').val()}/posts`,
        method:"GET",
        dataType:"json",
        success:(res)=>{
            //console.log(res);
            imprimirPosts(res.siguiendo);
        },
        error:(error)=>{
            console.error(error);
        }

    });
}

function obtenerUsuariosSiguiendo(){
    //Lista de usuarios que esta siguiendo
    $.ajax({
        url:`/usuarios/${$('#usuario-actual').val()}/siguiendo`,
        method:"GET",
        dataType:"json",
        success:(res)=>{
            //console.log(res);
            //Renderizar la información de la lista de usuarios con historias
            $('#usuarios-historias').html('<div class="card-header">Stories</div>');
            for (let i = 0; i < res.siguiendo.length; i++) {
                if (!res.siguiendo[i]['historias'])
                    continue;

                $('#usuarios-historias').append(
                    `<div class="px-1 py-2 story-card pointer" onclick="verHistoria('${res.siguiendo[i]._id}');">
                        <div class="fl">
                        <img class="img-fluid img-thumbnail rounded-circle img-thumbnail-historia" src="${res.siguiendo[i].imagen}">
                        </div>  
                        <div class="py-1 px-1 fl">
                        <small><b>${res.siguiendo[i].nombre}(${res.siguiendo[i].historias.length})</b></small><br>
                        <small class="muted">12/12/2012</small>
                        </div>
                    </div>`
                );
            }

            //Renderizar la información de los usuarios que lo estan siguiendo
            $('#usuarios-siguiendo').html('<div class="card-header">Siguiendo<button class="btn btn-outline-danger btn-sm fr" data-toggle="modal" data-target="#nuevo-contacto"><i class="fas fa-user-plus"></i></button></div>');
            for (let i = 0; i < res.siguiendo.length; i++) {
                $('#usuarios-siguiendo').append(
                    `<div class="px-1 py-2 story-card">
                        <div class="fl">
                        <img class="img-fluid img-thumbnail rounded-circle" src="${res.siguiendo[i].imagen}">
                        </div>  
                        <div class="py-1 px-1 fl">
                        <small><b>${res.siguiendo[i].nombre}</b></small><br>
                        </div>
                    </div>`
                );
            }
            
        },
        error:(error)=>{
            console.error(error);
        }

    });
}

function obtenerUsuariosSeguidores(){
    //Obtener todos los usuarios seguidores
    $.ajax({
        url:`/usuarios/${$('#usuario-actual').val()}/seguidores`,
        method:"GET",
        dataType:"json",
        success:(res)=>{
            console.log(res);
            $('#usuarios-seguidores').html('<div class="card-header">Seguidores</div>');
            for (let i = 0; i < res.seguidores.length; i++) {
                $('#usuarios-seguidores').append(
                    `<div class="px-1 py-2 story-card">
                        <div class="fl">
                        <img class="img-fluid img-thumbnail rounded-circle" src="${res.seguidores[i].imagen}">
                        </div>  
                        <div class="py-1 px-1 fl">
                        <small><b>${res.seguidores[i].nombre}</b></small><br>
                        </div>
                    </div>`
                );
            }
        },
        error:(error)=>{
            console.error(error);
        }

    });
}


function verHistoria(codigoUsuario){
    console.log(`Ver historias del usuario ${codigoUsuario} `);
    $.ajax({
        url:`/usuarios/${codigoUsuario}/historias`,
        method:"GET",
        dataType:"json",
        success:(res)=>{
            console.log(res);
            $("#historias").empty();
            $("#usuario-historias").html(res.nombre);
            for (let i = 0; i < res.historias.length; i++) {
                $("#historias").append(
                    `<div class="historia">
                        <div class="historia-image-post" style="background-image: url(${res.historias[i].imagenHistoria})">
                            <div class="historia-titulo">${res.historias[i].tituloHistoria}</div>
                        </div>
                    </div>`
                );
            }

            $('#ver-historia').modal('show');
        },
        error:(error)=>{
            console.error(error);
        }
    });
}


function like(idPost,idUsuarioPost){
    //console.log("Like al post " + idPost +'del usuario '+ idUsuarioPost);
    //console.log("Usuario que da like: " + $('#usuario-actual').val());
    let parametros = `idUsuarioPost=${idUsuarioPost}&idUsuarioLike=${$('#usuario-actual').val()}`;
    console.log('Parametros: '+parametros);
    $.ajax({
        url:`/usuarios/posts/${idPost}/likes`,
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log(res);
            if (res.ok==1){
                let cantidadLikes = parseInt($('#likes-'+idPost).html());
                $('#likes-'+idPost).html(cantidadLikes+1);
            }
        },
        error:(error)=>{
            console.error(error);
        }
    });
}

function comentar(idPost, idUsuarioPost){
    console.log(`Comentar el post ${idPost} con el comentario ${$("#comentario-post-"+idPost).val()}, el dueño del post es: ${idUsuarioPost}`);
    console.log(`El usuario que comenta es: ${$('#usuario-actual').val()}, ${$('#usuario-actual option:selected').text()}`);
    let parametros = `idUsuarioPost=${idUsuarioPost}&idUsuarioComenta=${$('#usuario-actual').val()}&nombreUsuarioComenta=${$('#usuario-actual option:selected').text()}&comentario=${$("#comentario-post-"+idPost).val()}`;
    console.log(parametros);
    $.ajax({
        url:`/usuarios/posts/${idPost}/comentarios`,
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log(res);
            if (res.ok==1){
                $('#comentarios').append(
                    `<div>
                        <span class="post-user">${$('#usuario-actual option:selected').text()}</span>
                        <span class="post-content">${$("#comentario-post-"+idPost).val()}</span>
                    </div>`
                );
            }
        },
        error:(error)=>{
            console.error(error);
        }
    });

}


function imprimirPosts(usuarios){
    $("#posts").empty();
    for (let i=0;i<usuarios.length;i++){
        for (let j=0;j<usuarios[i].posts.length;j++){
            let comentarios ="";
            for (let k=0;k<usuarios[i].posts[j].comentarios.length;k++){
                comentarios+=
                        `<div>
                            <span class="post-user">${usuarios[i].posts[j].comentarios[k].usuario.nombre}</span>
                            <span class="post-content">${usuarios[i].posts[j].comentarios[k].comentario}</span>
                        </div>`;
            }
            $("#posts").append(
                    `<div class="col-lg-12">
                    <div class="card mb-4 shadow-sm">
                        <div class="card-header">
                            <img class="img-fluid img-thumbnail rounded-circle" src="${usuarios[i].imagen}">    
                            <span>${usuarios[i].nombre}</span>
                        </div>
                        <div class="card-body px-0 py-0">
                        <div class="image-post" style="background-image: url(${usuarios[i].posts[j].imagen});">

                        </div>
                        <div class="px-3 py-3 post">
                            <span class="pointer" onclick="like('${usuarios[i].posts[j]._id}','${usuarios[i]._id}');"><i class="far fa-heart"></i></span>&nbsp;<span id="likes-${usuarios[i].posts[j]._id}">${usuarios[i].posts[j].likes.length}</span> Likes<br>
                            <span class="post-user">${usuarios[i].nombre}</span>
                            <span class="post-content">${usuarios[i].posts[j].contenidoPost}</span>
                            <hr> 
                            <b>Comments</b><br>
                            <div id="comentarios">
                                ${comentarios}
                            </div>
                            <hr>
                            <div class="px-0">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Comment" id="comentario-post-${usuarios[i].posts[j]._id}">
                                    <div class="input-group-append">
                                        <button type="button" onclick="comentar('${usuarios[i].posts[j]._id}','${usuarios[i]._id}');" class="btn btn-outline-danger"><i class="far fa-paper-plane"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>`
            );
        }
    }
}

function seguirUsuario(codigoUsuarioSeguir){
    console.log('El usuario ' + $("#usuario-actual").val() + ' seguira al usuario '+ codigoUsuarioSeguir);
    
    $.ajax({
        url:`/usuarios/${$("#usuario-actual").val()}/seguir/${codigoUsuarioSeguir}`,
        method:"PUT",
        dataType:"json",
        success:(res)=>{
            console.log(res);
        },
        error:(error)=>{
            console.error(error);
        }
    });
}

function nuevoPost(){
    let parametros = `contenidoPost=${$('#contenido-post').val()}&imagen=${$('#url-imagen').val()}`;
    console.log(parametros);

    $.ajax({
        url:`/usuarios/${$('#usuario-actual').val()}/posts/`,
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log(res);
        },
        error:(error)=>{
            console.error(error);
        }
    });
}
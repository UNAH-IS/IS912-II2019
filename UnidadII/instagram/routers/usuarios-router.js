//Usuarios REST API

var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');

//Servicio para obtener usuarios
router.get('/',function(req,res){
    usuario.find({},{_id:true,nombre:true,imagen:true})
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Servicio para obtener posts
router.get('/:id/posts',function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:"usuarios",
                localField:"siguiendo",
                foreignField:"_id", //Es decir el atributo de la coleccion con la que se va a relacinar, en este caso, coleccion2,
                as:"siguiendo"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $project:{
                _id:true,
                nombre:true,
                imagen:true,
                "siguiendo._id":true,
                "siguiendo.nombre":true,
                "siguiendo.imagen":true,
                "siguiendo.posts":true
            }
        }
    ])
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});


//Listar usuarios que se esta siguiendo
router.get('/:id/siguiendo',function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:"usuarios",
                localField:"siguiendo",
                foreignField:"_id", //Es decir el atributo de la coleccion con la que se va a relacinar, en este caso, coleccion2,
                as:"siguiendo"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $project:{
                _id:true,
                nombre:true,
                imagen:true,
                "siguiendo._id":true,
                "siguiendo.nombre":true,
                "siguiendo.imagen":true,
                "siguiendo.historias._id":true,
            }
        }
    ])
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener detalle de las historias del usuario seleccionado
router.get('/:id/historias',function(req,res){
    usuario.find({_id:req.params.id},{nombre:true,historias:true})
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});


//Listar usuarios que me siguen (seguidores)
router.get('/:id/seguidores',function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:"usuarios",
                localField:"seguidores",
                foreignField:"_id", //Es decir el atributo de la coleccion con la que se va a relacinar, en este caso, coleccion2,
                as:"seguidores"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $project:{
                _id:true,
                nombre:true,
                imagen:true,
                "seguidores._id":true,
                "seguidores.nombre":true,
                "seguidores.imagen":true
            }
        }
    ])
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Comentar un post de un usuario en particular
router.post('/posts/:idPost/comentarios',function(req,res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.body.idUsuarioPost),
            "posts._id":mongoose.Types.ObjectId(req.params.idPost)
        },
        {
            $push:{
                "posts.$.comentarios":{
                    _id:mongoose.Types.ObjectId(),
                    usuario:{
                        _id:mongoose.Types.ObjectId(req.body.idUsuarioComenta),
                        nombre: req.body.nombreUsuarioComenta
                    },
                    comentario:req.body.comentario
                }
            }
        }
    ).then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});


//Agregar Like
router.post('/posts/:idPost/likes',function(req,res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.body.idUsuarioPost),
            "posts._id":mongoose.Types.ObjectId(req.params.idPost)
        },
        {
            $push:{
                "posts.$.likes":mongoose.Types.ObjectId(req.body.idUsuarioLike)
            }
        }
    ).then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});


//Agregar un nuevo post
router.post('/:idUsuario/posts/',function(req,res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },
        {
            $push:{
                posts:{
                    _id:mongoose.Types.ObjectId(),
                    contenidoPost:req.body.contenidoPost,
                    urlImagen:req.body.imagen,
                    likes:[],
                    comentarios:[]
                }
            }
        }
    ).then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Seguir a otro usuario
router.put('/:id/seguir/:idUsuarioSeguir',function(req,res){
    usuario.update({_id:req.params.id},
        {$push:{siguiendo:mongoose.Types.ObjectId(req.params.idUsuarioSeguir)}}
    ).then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

module.exports = router;
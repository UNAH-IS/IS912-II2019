var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');

//Servicio web para obtener todos los usuarios

router.get('/',function(req,res){
    usuario.find({},{_id:1,nombre:1,imagen:1})
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener los posts de los usuarios a los que esta siguiendo.
/// Ejemplo de URL: /usuarios/58jfkjgdkjfg/posts-siguiendo/
router.get("/:id/posts-siguiendo/", function(req,res){
    usuario.aggregate(
        [
            { 
                $match:{
                    _id:mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup:{
                    from:"usuarios",
                    localField:"siguiendo",
                    foreignField:"_id", 
                    as:"siguiendo"
                }
            },
            {   
               $project:{
                    "_id":true,
                    "nombre":true,
                    "siguiendo._id":true,
                    "siguiendo.nombre":true,
                    "siguiendo.imagen":true,
                    "siguiendo.posts":true	
               } 
            }   
        ]
    )
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});



module.exports = router;
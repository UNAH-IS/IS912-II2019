var express = require('express');
var usuario = require('../models/usuario');
var router = express.Router();

//Guardar un usuario
router.post('/',function(req,res){
    let u = new usuario({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        birthdate:{
            day:req.body.day,
            month:req.body.month,
            year:req.body.year
        },
        gender:req.body.gender
    }); 

    //Promesa
    u.save()
    .then(function(obj){
        res.send(obj);
        res.end();
    })
    .catch(function(error){
        res.send(error);
        res.end();
    });
});

//Eliminar un usuario
router.delete('/:id',function(req,res){
    usuario.remove({_id:req.params.id})
    .then((result)=>{
        res.send(result);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener un usuario
router.get('/:id',function(req,res){
    usuario.find({_id:req.params.id})
    .then((data)=>{
        res.send(data[0]);//Se le pone 0 para que solo envie un json y no un arreglo con un json
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Obtener todos los usuarios
router.get('/',function(req,res){
    usuario.find()
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

router.put('/:id',function(req,res){
   usuario.update(
       {_id:req.params.id},
       {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            birthdate:{
                day:req.body.day,
                month:req.body.month,
                year:req.body.year
            },
            gender:req.body.gender
        }
   )
   .then((result)=>{
        res.send(result);
        res.end();
   })
   .catch((error)=>{
        res.send(error);
        res.end();
   });
});

module.exports = router;
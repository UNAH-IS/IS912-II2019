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
        gender:req.body.gender,
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

router.delete('/:id',function(req,res){
    res.send({mensaje:`Se eliminó el usuario con codigo ${req.params.id}`});
    res.end();
});

//Obtener un usuario
router.get('/:id',function(req,res){
    usuario.find({_id:req.params.id})
    .then((data)=>{
        res.send(data);
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
    usuarios[req.params.id] = req.body;
    res.send({mensaje:`Se actualizo el usuario con codigo ${req.params.id}`,usuarioActualizado:usuarios[req.params.id]});
    res.end();
});

module.exports = router;
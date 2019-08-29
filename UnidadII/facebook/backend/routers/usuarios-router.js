var express = require('express');
var router = express.Router();


var usuarios = [
    {firstName:'Jose',lastName:'Perez',email:'Jose@gmail.com'},
    {firstName:'Pedro',lastName:'Rodriguez',email:'Pedro@gmail.com'},
    {firstName:'Maria',lastName:'de Jesus',email:'Maria@gmail.com'},
    {firstName:'Jesus',lastName:'Gutierrez',email:'Jesus@gmail.com'}
];

router.post('/',function(req,res){
    res.send(req.body);
    res.end();
});

router.delete('/:id',function(req,res){
    res.send({mensaje:`Se eliminó el usuario con codigo ${req.params.id}`});
    res.end();
});

router.get('/:id',function(req,res){
    if (req.params.id >(usuarios.length-1))
        res.send({mensaje:'No existe el usuario'});    
    else
        res.send(usuarios[req.params.id]);
    res.end();
});

router.get('/',function(req,res){
    res.send(usuarios);
    res.end();
});

router.put('/:id',function(req,res){
    usuarios[req.params.id] = req.body;
    res.send({mensaje:`Se actualizo el usuario con codigo ${req.params.id}`,usuarioActualizado:usuarios[req.params.id]});
    res.end();
});

module.exports = router;
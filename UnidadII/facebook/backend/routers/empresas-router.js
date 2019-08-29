var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.send({mensaje:"Obtener todos las empresas"});
    res.end();
});

router.get('/:id',function(req,res){
    res.send({mensaje:"Obtener todos la empresa "+ req.params.id});
    res.end();
});

router.post('/',function(req,res){
    res.send({mensaje:"Guardar una nueva empresa"});
    res.end();
});

router.put('/:id',function(req,res){
    res.send({mensaje:"Actualizar la empresa " + req.params.id});
    res.end();
});

router.delete('/:id',function(req,res){
    res.send({mensaje:"Eliminar empresa con el id " + req.params.id});
    res.end();
});

module.exports = router;
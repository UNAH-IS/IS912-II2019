var express = require('express');
var app = express();

//use es una funcion para ejecutar funciones tipo middleware
//Estas funciones se ejecutan antes de cualquier respuesta personalizada del backend
app.use(express.static('public'));

app.get('/hola-mundo',function(req, res){
    res.send('<html><body><h1>Hola mundo</h1></body></html>');
    res.end();
});

app.get('/home',function(req, res){
    res.send('<html><body><h1>Pagina HOME</h1></body></html>');
    res.end();
});

app.get('/as*de',function(req, res){//asde
    res.send('<html><body><h1>Cumple con el patron as*de</h1></body></html>');
    res.end();
});

app.get('/capitulo/:numero',function(req,res){
    res.send(`<html><body><h1>Ver capitulo ${req.params.numero}</h1></body></html>`);
    res.end();
});

app.listen(3333, function(){
    console.log('Servidor levantado en 3333');
});
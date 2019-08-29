var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//use es una funcion para ejecutar funciones tipo middleware
//Estas funciones se ejecutan antes de cualquier respuesta personalizada del backend
app.use(express.static('public'));

//El objetivo de estas lineas es poblar el json req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get('/procesar',function(req, res){
    res.send(req.query); //Para acceder a parametros que se envian en GET
    res.end();
});

app.post('/procesar',function(req, res){
    //body-parser: Acceder a la información que se envia por POST
    res.send(req.body); //Para acceder a parametros que se envian en POST
    res.end();
});
/*
app.get('/procesar',function(req, res){
    setTimeout(()=>{
        res.send(`<html><body><h1>Procesar la informacion</h1>${JSON.stringify(req.query)}</body></html>`);
        res.end();
    },10000)
    
});*/

app.listen(8888, function(){
    console.log('Servidor levantado en 8888');
});
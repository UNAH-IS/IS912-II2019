var express = require('express');
var app = express();

//use es una funcion para ejecutar funciones tipo middleware
//Estas funciones se ejecutan antes de cualquier respuesta personalizada del backend
app.use(express.static('public'));


app.post('/procesar',function(req, res){
    //body-parser: Acceder a la información que se envia por POST
    res.send(`<html><body><h1>Procesar la informacion enviada por post</h1></body></html>`);
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
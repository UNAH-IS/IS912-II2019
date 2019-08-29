var express = require('express');
var bodyParser = require('body-parser');
var testModule = require('./modules/test-module');
var usuariosRouter = require('./routers/usuarios-router');
var empresasRouter = require('./routers/empresas-router');
var database = require('./modules/database');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/usuarios',usuariosRouter);
app.use('/empresas',empresasRouter);

app.get('/',function(req,res){
    res.send(testModule.mensaje() + ', ' + testModule.valorX);
    res.end();
});

app.listen(8888, ()=>{
    console.log('Servidor levantado en 8888');
});
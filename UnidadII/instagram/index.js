var express = require("express");
var database = require("./modules/database");
var bodyParser = require("body-parser");
var usuariosRouter = require("./routers/usuarios-router");
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use('/usuarios',usuariosRouter);

app.listen(3336, function(){
    console.log("Servidor en linea");
});
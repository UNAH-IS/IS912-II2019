var express = require("express");
var database = require("./modules/database");
var usuariosRouter = require("./routers/usuarios-router");
var app = express();

app.use(express.static("public"));
app.use('/usuarios',usuariosRouter);

app.listen(3336, function(){
    console.log("Servidor en linea");
});
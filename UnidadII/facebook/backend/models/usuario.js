var mongoose = require('mongoose');

//Schema: Define la estructura de los objetos que se guardaran en una coleccion.
var esquema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    birthdate:mongoose.SchemaTypes.Mixed, 
    gender:String
});

//El primer parametro tiene que ser el nombre de la coleccion en mongo (puede ser el singular)
module.exports = mongoose.model('usuarios',esquema);

/*
Tipos de datos:
Array
Boolean
Buffer
Date
Mixed (Otro JSON o algun tipo de dato flexible)
Number
ObjectId
String
*/
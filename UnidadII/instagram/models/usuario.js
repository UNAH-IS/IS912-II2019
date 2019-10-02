var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombre : String,
    correo : String,
    contrasena : String,
    imagen : String,
    siguiendo : Array,
    seguidores : Array,
    posts : Array,
    historias : Array
});

module.exports = mongoose.model('usuarios',esquema);




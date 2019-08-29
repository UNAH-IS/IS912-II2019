var http = require('http');
let nombre = 'Juan';

http.createServer(function(req, res){//peticion, respuesta
    //Se ejecutará cada vez que nuestro servidor reciba una peticion.
    res.writeHead(200, {'Content-type':'text/html'});//codigo http, json con los encabezados
    res.write(`<html><body><h1>Hola ${nombre}</h1>${req.url}</body></html>`);
    res.end();
}).listen(8888,function(){
    console.log('Servidor levantado en 8888');
});
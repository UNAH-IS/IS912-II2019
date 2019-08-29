var http = require('http');
var fs = require('fs');
let nombre = 'Juan';

http.createServer(function(req, res){//peticion, respuesta
    //Se ejecutará cada vez que nuestro servidor reciba una peticion.
    if (req.url == "/pagina1"){
        res.writeHead(200, {'Content-type':'text/html'});//codigo http, json con los encabezados
        res.write(`<html><body><h1>Hola ${nombre}, esta es la PAGINA1</h1>${req.url}</body></html>`);
        res.end();
    }
    else if(req.url == "/pagina2"){
        res.writeHead(200, {'Content-type':'text/html'});//codigo http, json con los encabezados
        res.write(`<html><link rel="stylesheet" href="estilos"><body><h1>Hola ${nombre}, esta es la PAGINA2</h1>${req.url}</body></html>`);
        res.end();
    }else if (req.url == "/estilos"){
        res.writeHead(200, {'Content-type':'text/css'});//codigo http, json con los encabezados
        res.write(`h1{color:red;}`);
        res.end();
    }else if (req.url =='/formulario'){
        fs.readFile('./formulario.html',function(error, data){
            res.writeHead(200, {'Content-type':'text/html'});//codigo http, json con los encabezados
            if (error)
                res.write(error);
            else 
                res.write(data);
            res.end();
        });
    }else{
        res.writeHead(404, {'Content-type':'text/html'});//codigo http, json con los encabezados
        res.write(`<html><head><meta charset="UTF-8"></head><body><h1 style="color:blue">404, página no disponible</h1></body></html>`);
        res.end();
    }
}).listen(8888,function(){
    console.log('Servidor levantado en 8888');
});
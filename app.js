const http = require('http');
const fs = require('fs');
const ruta = require('path');

const server = http.createServer(function (request, response){
    var archivo = request.url

    console.log('client request URL: ',archivo);
    
    var contentType = "text/html";
    // if (archivo.search('.') > 0){
        switch (ruta.extname(archivo)){
            case '.css':
                contentType = "text/css";
                break;
            case '.js':
                contentType = "text/javascript";
                break;
            case '.jpg':
                contentType = "image/jpeg";
                break;
            case '.js':
                contentType = "application/javascript";
                break;
        }
    // }
    
    if(archivo === '/autos/nuevo') {
        fs.readFile('vistas/formulario.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': contentType});  
            response.end(contents);  
        });
    } else if(archivo === '/autos') {
        fs.readFile('vistas/autos.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': contentType});  
            response.end(contents);  
        });
    } else if(archivo === '/gatos') {
        fs.readFile('vistas/gatos.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': contentType});  
            response.end(contents);  
        });
    }
    else {
        fs.exists("./" + archivo, (existe) => {
            if (existe){
                fs.readFile("./" + archivo, function (errors, contents){
                    response.writeHead(200, {'Content-Type': contentType});  
                    response.end(contents);  
                });
            }
            else {
                fs.readFile('vistas/error.html', 'utf8', function (errors, contents){
                    response.writeHead(200, {'Content-Type': contentType});  
                    response.end(contents);  
                });
            }
        });
    }
});

server.listen(7077);
console.log("Running in localhost at port 7077");
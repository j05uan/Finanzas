const http = require('http');

const hostname = 'localhost';
const port = 3000; 

const server = http.createServer((req, res) => {
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET' && req.url === '/presupuesto') {
        const presupuestos = [
            { id: 1, nombre: "Presupuesto 1" },
            { id: 2, nombre: "Presupuesto 2" }
        ];
        res.end(JSON.stringify(presupuestos)); 
    } else {
        res.statusCode = 404; 
        res.end(JSON.stringify({ mensaje: 'Ruta no encontrada' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Servidor en funcionamiento en http://${hostname}:${port}`);
});

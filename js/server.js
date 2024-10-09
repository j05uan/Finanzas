const http = require('http');

const hostname = 'localhost';
const port = 3000; // Puedes cambiar el puerto si lo deseas

const server = http.createServer((req, res) => {
    res.statusCode = 200; // Código de estado OK
    res.setHeader('Content-Type', 'application/json');

    // Verifica la ruta de la solicitud
    if (req.method === 'GET' && req.url === '/presupuesto') {
        // Aquí puedes devolver datos de presupuestos
        const presupuestos = [
            { id: 1, nombre: "Presupuesto 1" },
            { id: 2, nombre: "Presupuesto 2" }
        ];
        res.end(JSON.stringify(presupuestos)); // Devuelve los presupuestos como JSON
    } else {
        res.statusCode = 404; // Código de estado Not Found
        res.end(JSON.stringify({ mensaje: 'Ruta no encontrada' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Servidor en funcionamiento en http://${hostname}:${port}`);
});

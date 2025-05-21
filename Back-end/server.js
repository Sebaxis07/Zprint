import express from 'express';

const server = express();

server.get('/', (req, res) => {
    res.send('Hola mundo');
})

server.get('/products', (req, res) => {
    res.send('Productos');
})

server.listen(3000)
console.log('Server is running on port 3000');
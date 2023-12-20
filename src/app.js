import express from "express";
import productsRouter from "../routes/products.routes.js";
import cartsRouter from "../routes/carts.routes.js";
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const app = express();

const products = [
  {
    id: 1,
    title: 'Producto 1',
    code: '12345',
    price: 100,
    stock: 10,
    category: 'Electrónica',
  },
  {
    id: 2,
    title: 'Producto 2',
    code: '67890',
    price: 200,
    stock: 20,
    category: 'Moda',
  },
];

io.on('connection', (socket) => {
  socket.emit('products', products);

  socket.on('createProduct', (producto) => {
    products.push(producto);
    socket.emit('products', products);
  });

  socket.on('deleteProduct', (id) => {
    const index = products.findIndex((producto) => producto.id === id);
    products.splice(index, 1);
    socket.emit('products', products);
  });
});

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products',productsRouter);

app.use('/api/carts',cartsRouter);

app.listen(PORT, () => {
    console.log(`Esperando entrada en puerto: ${PORT}`);
});



    

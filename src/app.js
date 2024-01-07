import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import { ProductManager } from "./dao/ProductManager.js";
import mongoose from "mongoose";
import { productModel } from "./dao/models/product.model.js";

const PORT = 8080;
const app = express();
const httpServer = app.listen(PORT, () => {console.log(`Esperando entrada en puerto: ${PORT}`);});
const io = new Server(httpServer);

const productManager = new ProductManager('./productos.json');

app.use(express.static('public'));
app.engine('handlebars',handlebars.engine());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set('views','src/views');
app.set('view engine','handlebars');

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
mongoose.connect('mongodb+srv://matimoralestepp:ecommerceMoralesMatias@ecommerce.89vsykd.mongodb.net/ecommerce');

io.on('connection',async  (socket) => {
  let products = await productModel.find();
  socket.emit('products', {products});
  
  socket.on('createProduct', (producto) => {
    productManager.addProduct(producto);
    products = productManager.getProducts();
    socket.emit('products', {products});
  });

  socket.on('deleteProduct', (id) => {
    productManager.deleteProduct(+id);
    products = productManager.getProducts();
    socket.emit('products', {products});
  });
});


app.get('/',(req, res)=>{
  const products = productManager.getProducts();
  res.render('home',{products});
});

app.get('/realtimeproducts',(req,res)=>{
  res.render('realTimeProducts');
});



    

import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { productModel } from "./models/product.model.js";
import { messageModel } from "./models/message.model.js";
import { cartModel } from "./models/cart.model.js";

const PORT = 8080;
const app = express();
const httpServer = app.listen(PORT, () => {console.log(`Esperando entrada en puerto: ${PORT}`);});
const io = new Server(httpServer);

app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({extended: true}));


const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
})

app.engine('handlebars',hbs.engine);
app.set('views','src/views');
app.set('view engine','handlebars');

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
mongoose.connect('mongodb+srv://matimoralestepp:ecommerceMoralesMatias@ecommerce.89vsykd.mongodb.net/ecommerce');

io.on('connection', async  (socket) => {

  let products = await productModel.find();

  socket.emit('products', {products});
  
  socket.on('createProduct', async (producto) => {
    await productModel.create(producto);
    products = await productModel.find();
    socket.emit('products', {products});
  });

  socket.on('deleteProduct', async (id) => {
    await productModel.deleteOne({_id: id});
    products = await productModel.find();
    socket.emit('products', {products});
  });

  let messages = await messageModel.find();

  socket.emit('chat', {messages});

  socket.on('newMessage', async (message)=>{
    await messageModel.create(message);
    messages = await messageModel.find();
    io.emit('chat', {messages});
  });

});


app.get('/', async (req, res)=>{
  const products = await productModel.find().lean();
  res.render('home',{ products });
});

app.get('/realtimeproducts',(req,res)=>{

  res.render('realTimeProducts');

});

app.get('/chat', (req,res)=>{

  res.render('chat');

});

app.get('/carts/:cid', async (req, res) => {
  try {
  
    const { cid } = req.params;

    const cart = await cartModel.findById(cid).populate('products.product').lean();

    if(!cart) return res.status(404).send({message: 'Cart not found'});

    const products = cart.products;

    res.render('cart',{ products });
    
  } catch (error) {
    
    console.error(error);

    res.status(500).send(error);

  }
});

app.get('/products', async (req, res) => {
  try {

    const { page } = req.query;

    const _page = page? +page : 1;

    const products = await productModel.aggregatePaginate(productModel.aggregate(),{ page: _page });

    if(!products) return res.status(400).send({ message: 'Products not found' });

    res.render('products', products );

  } catch (error) {
    
    console.error(error);

    res.status(500).send(error);

  }
});


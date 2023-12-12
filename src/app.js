import express from "express";
import productsRouter from "../routes/products.routes.js";
import cartsRouter from "../routes/carts.routes.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products',productsRouter);

app.use('/api/carts',cartsRouter);

/*for (let i = 1; i <= 10; i++) {
    const newProduct = {
      title: `Product ${i}`,
      description: `Description for Product ${i}`,
      price: 10.99 * i,
      thumbnail: `thumbnail${i}.jpg`,
      code: `P${i}`,
      stock: 100,
    };

    productManager.addProduct(newProduct);
}*/

app.listen(PORT, () => {
    console.log(`Esperando entrada en puerto: ${PORT}`);
});



    

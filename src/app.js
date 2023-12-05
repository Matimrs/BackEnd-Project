import express from "express";
import { ProductManager } from "./ProductManager.js";

const productManager = new ProductManager('./products.json');

const PORT = 8080;
const app = express();
app.use(express.urlencoded({extended: true}));

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



app.get('/products', async (req, res) => {
  try {
    const {limit} = req.query;
    const products = await productManager.getProducts();

    if (limit) {
      res.json(products.slice(0, +limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const {pid} = req.params;
    const products = await productManager.getProducts();
    const product = products.find(p => p.id === +pid);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
    console.log(`Esperando entrada en puerto: ${PORT}`);
});



    

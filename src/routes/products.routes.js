import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productsRouter = Router();

const productManager = new ProductManager('./productos.json');


productsRouter.get('/', (req, res) => {
    try {
      const { limit } = req.query;
      const products = productManager.getProducts();
  
      if (limit) {
        res.send(products.slice(0, +limit));
      } else {
        res.send(products);
      }
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  });
  
productsRouter.get('/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const products = await productManager.getProducts();
      const product = products.find(p => p.id === +pid);
  
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  });


productsRouter.post('/', async (req, res) => {
        const product = req.body;
        const status = await productManager.addProduct(product);
        if(status === -2){
          res.status(400).send({message: 'Existing product'});
        }
        else if(status === -1){
          res.status(400).send({message: 'All fields are required'});
        }
        res.send(product);
});

productsRouter.put('/:pid', (req, res) => {
    try{
        const { pid } = req.params;
        const product = req.body;
        const products = productManager.getProducts();
        const currentProduct = products.find(p => p.id === +pid);

        if(currentProduct){
            productManager.updateProduct(+pid, product);
            res.send({message: 'Product updated'});
        }
        else{
            res.status(404).send({error: 'Product not found'});
        }
    }
    catch(error){
        res.status(500).send({error: 'Internal server error'});
    }
});

productsRouter.delete('/:pid', (req, res) => {
    try{
        const { pid } = req.params;
        const products = productManager.getProducts();
        const currentProduct = products.find(p => p.id === +pid);

        if(currentProduct){
            productManager.deleteProduct(pid);
            res.send({message: 'Product deleted'})
        }
        else{
            res.status(404).send({error: 'Product not found'});
        }
    }
    catch(error){
        res.status(500).send({error: 'Internal server error'});
    }
});

export default productsRouter;
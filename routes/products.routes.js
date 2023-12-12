import { Router } from "express";
import { ProductManager } from "../src/ProductManager";

const productManager = new ProductManager('../productos.json');

const productsRouter = Router();

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
  
productsRouter.get('/:pid', (req, res) => {
    try {
      const { pid } = req.params;
      const products = productManager.getProducts();
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

productsRouter.post('/', (req, res) => {
    try{
        const { product } = req.body;
        productManager.addProduct(product);
        res.send({message: 'Product added'})
    }
    catch(error){
        res.status(500).send({ error: 'Internal server error'});
    }
});

productsRouter.put('/:pid', (req, res) => {
    try{
        const { pid } = req.params;
        const { product } = req.body;
        const products = productManager.getProducts();
        const currentProduct = products.find(p => p.id === +pid);

        if(currentProduct){
            productManager.updateProduct(pid, product);
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
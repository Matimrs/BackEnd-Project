import { Router } from "express";
import { CartManager } from "../src/CartManager.js";

const cartsRouter = Router();

const cartManager = new CartManager('./carritos.json');

cartsRouter.post('/', (req, res) => {
    try {
        const status = cartManager.addCart();
        if(status){
            res.send({message: 'Cart created'});
        }
        else{
            res.status(400).send({error: 'Cart not added'});
        }
    } catch (error) {
        res.status(500).send({error: 'Internal server error'});
    }
});

cartsRouter.get('/:cid', (req,res) => {
    try {
        const { cid } = req.params;
        const cart = cartManager.getCartById(cid);
        if(!cart){
            res.status(404).send({error: 'Cart not found'});
        }
        res.send(cart.products);
    } catch (error) {
        res.status(500).send({error: 'Internal server error'});
    }
});

cartsRouter.post('/:cid/product/:pid',(req,res) => {
    const {cid, pid} = req.params;
    cartManager.addProductToCart(+cid,+pid);
    res.send({message: 'Product added'});
});

export default cartsRouter;
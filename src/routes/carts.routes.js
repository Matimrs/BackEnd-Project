import { Router } from "express";
import { CartManager } from "../dao/CartManager.js";
import { cartModel } from "../dao/models/cart.model.js";

const cartsRouter = Router();

cartsRouter.get('/', async (req,res)=>{
    try {
        const carts = await cartModel.find();
        res.send(carts);
    } catch (error) {
        res.status(500).send({error: 'Internal server error'});
    }
});

cartsRouter.post('/', async (req, res) => {
    try {
        const status = await cartModel.create({products: []});
        if(!!status){
            res.send({message: 'Cart created'});
        }
        else{
            res.status(400).send({error: 'Cart not added'});
        }
    } catch (error) {
        res.status(500).send({error: 'Internal server error'});
    }
});

cartsRouter.get('/:cid', async (req,res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findOne({_id: cid});
        if(!cart){
            res.status(404).send({error: 'Cart not found'});
        }
        res.send(cart.products);
    } catch (error) {
        res.status(500).send({error: 'Internal server error'});
    }
});

cartsRouter.post('/:cid/product/:pid', async (req,res) => {
    try {
        const {cid, pid} = req.params;
        const cart = await cartModel.findOne({_id: cid});
        let flag = false;
        console.log(cart)
        const products = cart.products.map(p =>
        {
            if(p.product === pid) {
                flag = true;
                return {product: pid, quantity: p.quantity + 1 }
            }
            return p;
        })
        if(!flag){
            await cartModel.updateOne({_id: cid}, {products: [...products , {product: pid, quantity: 1}]});
        }
        else await cartModel.updateOne({_id: cid}, {products: products});
        
        res.send({message: 'Product added'});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Internal server error'});
    }
    
});

export default cartsRouter;
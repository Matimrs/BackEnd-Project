import { Router } from "express";
import { cartModel } from "../models/cart.model.js";
import mongoose from 'mongoose';
import { validateProducts } from "../middlewares/validateProducts.js";

const cartsRouter = Router();

cartsRouter.get('/', async (req,res)=>{
    try {
       
        const carts = await cartModel.find().populate('products.product');
       
        res.send(carts);
    
    } catch (error) {
        
        res.status(500).send({error: 'Internal server error'});
    
    }
});

cartsRouter.post('/', async (req, res) => {
    try {
        
        const status = await cartModel.create({products: []});
        
        if(!!status){
        
            return res.send({message: 'Cart created'});
        
        }
        
        res.status(400).send({error: 'Cart not added'});
        
    } catch (error) {
        
        res.status(500).send({error: 'Internal server error'});
    
    }
});

cartsRouter.get('/:cid', async (req,res) => {
    try {
        
        const { cid } = req.params;
        
        const cart = await cartModel.findOne({_id: cid}).populate('products.product');
        
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
        
        const _pid = new mongoose.Types.ObjectId(pid);
        
        const products = cart.products.map((p) =>
        {
        
            if(p.product.equals(_pid)) {
        
                flag = true;
        
                return { product: _pid, quantity: p.quantity + 1 }
        
            }
        
            return p;
        
        });
        
        if(!flag) await cartModel.updateOne({_id: cid}, {products: [...products , {product: pid, quantity: 1}]});
        
        else await cartModel.updateOne({_id: cid}, {products: products});
        
        
        res.send({ message: 'Product added' });
    
    } catch (error) {
        
        console.error(error);
        
        res.status(500).send({message: 'Internal server error'});
    
    }
    
});

cartsRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        
        const { cid, pid } = req.params;

        const _pid = new mongoose.Types.ObjectId(pid);

        const cart = await cartModel.findOne({_id: cid});

        if(!cart) return res.status(400).send({ message: 'Cart not found' });

        const product = cart.products.find(p => p.product.equals(_pid));

        if(!product) return res.status(400).send({ message: 'Product not found in this cart' });

        const productIndex = cart.products.indexOf(product);
        
        cart.products.splice( productIndex, 1);

        cart.save();

        res.send({ message: 'Product deleted' });

    } catch (error) {
        
        console.error(error);

        res.status(500).send(error);

    }
});

cartsRouter.delete('/:cid', async (req, res) => {
    try {
        
        const { cid } = req.params;

        const status = await cartModel.findByIdAndUpdate({_id: cid}, {products: []});

        if(!status) return res.status(400).send({ message: 'Cart not found' });

        res.send({ message: 'Products deleted from cart' });

    } catch (error) {

        console.error(error);

        res.status(500).send(error);

    }
});

cartsRouter.put('/:cid/product/:pid', async (req, res) => {
    try {

        const { cid, pid } = req.params;
        
        const { quantity } = req.body;

        const _pid = new mongoose.Types.ObjectId(pid);

        const cart = await cartModel.findById(cid);

        if(!cart) return res.status(400).send({ message: 'Cart not found' });

        const product = cart.products.find(p => p.product.equals(_pid));

        if(!product) return res.status(400).send({ message: 'Product not found in the cart' });

        product.quantity = quantity;
        
        cart.save();

        res.send({ message: 'Product updated' })

    } catch (error) {
        
        console.error(error);

        res.status(500).send(error);

    }
});

cartsRouter.put('/:cid', validateProducts ,async (req, res) => {
    try {
        
        const { cid } = req.params;

        const { products } = req.body;

        const cart = await cartModel.findById(cid);

        if(!cart) return res.status(400).send({ message: 'Cart not found' });

        cart.products = products;

        cart.save();

        res.send({ message: 'Products modified success' });

    } catch (error) {
        
        console.error(error);

        res.status(500).send(error);

    }
});

export default cartsRouter;
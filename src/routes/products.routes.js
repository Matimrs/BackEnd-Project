import { Router } from "express";
import { ProductManager } from "../dao/ProductManager.js";
import { productModel } from "../dao/models/product.model.js";

const productsRouter = Router();


productsRouter.get('/', async (req, res) => {
    try {

      const { limit, page, sort, query } = req.query;

      const _limit = limit? +limit : 10;

      const _page = page? +page : 1;

      let products;
      
      if(sort){

        if(query){

          products = await productModel.aggregatePaginate(productModel.aggregate([
            {
              $match: {
                category: query
              }
            },
            {
              $sort: {price: +sort}
            }
          ]),{limit: _limit, page: _page} );

        }
        else{

          products = await productModel.aggregatePaginate(productModel.aggregate([
            {
              $sort: {price: +sort}
            }
          ]),{limit: _limit, page: _page} );

        }
      }
      else{

        if(query){

          products = await productModel.aggregatePaginate(productModel.aggregate([
            {
              $match: {
                category: query
              }
            }
          ]),{limit: _limit, page: _page} );

        }
        else{

          products = await productModel.aggregatePaginate(productModel.aggregate([]),{limit: _limit, page: _page} );

        }

      }

      products.payload = products.docs;

      delete products.docs;

      if(!products){
      
        products = {status: 'error'};

        return res.status(400).send({message: 'Products not found'});

      }

      products.status = 'success';

      const linkLimit = limit? `&limit=${_limit}` : '';

      const linkSort = sort? `&sort=${sort}` : '';

      const linkQuery = query? `&query=${query}` : '';

      products.nextLink = products.hasNextPage? `/products?page=${_page + 1}${linkLimit + linkQuery + linkSort}` : null;

      products.prevLink = products.hasPrevPage? `/products?page=${_page - 1}${linkLimit + linkQuery + linkSort}` : null;

      res.send(products);
      
    } catch (error) {
     
      console.error(error);
     
     
      res.status(500).send({ error: 'Internal server error' });

    }
  });
  
productsRouter.get('/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productModel.findOne({_id: pid});
      if (!!product) {
        res.send(product);
      } else {
        res.status(404).send({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  });


productsRouter.post('/', async (req, res) => {
        try {
          const product = req.body;
          try {
            const existing = await productModel.findOne({code: product.code});
            if(!!existing){
              return res.status(400).send({message: 'The product already exists'})
            }
            await productModel.create({...product, available: true});
            res.send({message: 'Product added'});
          } catch (error) {
            console.error(error);
            res.status(400).send({error: 'All fields are required'});
          }
          }
        catch (error) {
          console.error(error);
          res.status(500).send({ error: 'Internal server error' })
        }
});

productsRouter.put('/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        const product = req.body;
        try {
          await productModel.findOneAndUpdate({_id: pid}, product);
          res.send({message: 'Product updated'})
        } catch (error) {
          console.error(error);
          res.status(400).send({error: 'Product not found'});
        }
    }
    catch(error){
      console.error(error);
      res.status(500).send({error: 'Internal server error'});
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        try {
          await productModel.findOneAndDelete({_id: pid});
          res.send({message: 'Product deleted'})
        } catch (error) {
          console.error(error);
          res.status(404).send({error: 'Product not found'});
        }
    }
    catch(error){
      console.error(error);
      res.status(500).send({error: 'Internal server error'});
    }
});

export default productsRouter;
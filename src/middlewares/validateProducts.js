export const validateProducts = (req, res, next) => {

    const { products } = req.body;

    if(typeof products !== Array) return res.status(400).send({ error: 'Invalid format' });

    next();
    
}

export const validateProducts = (req, res, next) => {

    const { products } = req.body;

    if(typeof products !== typeof []) return res.status(400).send({ error: 'Invalid format' });

    const typeId = typeof "id";

    let valid = true;

    products.forEach(p => {
        if(typeof p.product !== typeId) valid = false;
        if(typeof p.quantity !== typeof 1) valid = false;
        if(typeof p._id !== typeId) valid = false;
    });

    if(!valid) return res.status(400).send({message: 'Invalid format'});

    next();
    
}

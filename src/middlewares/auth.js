import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.redirect('/login');
    }
    
    jwt.verify(token, 'm4t14s', (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }
        next();
    });
};

export const existingUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'm4t14s', (err, decoded) => {
            if (!err) {
                return res.redirect('/');
            }
            next();
        });
    } else {
        next();
    }
};
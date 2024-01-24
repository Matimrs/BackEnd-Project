export const isAuth = (req, res, next) => {
    if(!req.session.user) return res.redirect('/login');
    next();      
};

export const existingUser = (req, res, next) => {
    return req.session.user? res.redirect('/') : next();
}
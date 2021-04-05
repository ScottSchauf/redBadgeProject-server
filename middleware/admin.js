const adminMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        if (req.user.isAdmin == true) {
            next();
        } else {
            res.status(401).json({
                message: 'Admin authorization needed'
            });
            console.log(req.user.isAdmin);
        }
    }
}

module.exports = adminMiddleware;
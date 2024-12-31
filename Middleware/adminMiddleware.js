

const adminMiddleware = (req, res, next) => {
    // Check if the user is an admin
    if(req.user.role != 'admin'){
        return res.status(401).json({message: 'Not authorized as an admin'});
    }
    next();
}

module.exports = { admin: adminMiddleware } ;
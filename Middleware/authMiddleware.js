const jwt = require('jsonwebtoken');
const User = require('../Models/userModel.js');
const { verifyToken } = require('../utils/generatToken.js');

// Middleware to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
    // initialize token
    let token;

    // Check if the token is in the headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get the token from the headers
            token = req.headers.authorization.split(' ')[1];

            // Decode the token
            const decoded = verifyToken(token);

            // Find the user by the id and exclude the password
            req.user = await User.findById(decoded.id).select('-password');

            // Call the next middleware
            next();

        }catch(error){
            console.error('Error in authMiddleware: ', error.message);
            return res.status(401).json({message: 'Not authorized, token failed'});
        }
    } else {
        return res.status(401).json({message: 'Not authorized, no token'});
    }

   
}

module.exports = authMiddleware;
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // if (!process.env.JWT_SECRET) {
    //     throw new Error('JWT_SECRET is not defined in the environment variables');
    // }
    // return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    try{
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    }catch(error){
        console.error('Error during token generation', error);
        throw new Error('Error during token generation');
    }
}

const verifyToken = (token) => {
    try{
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        return jwt.verify(token, process.env.JWT_SECRET);
        
    }catch(error){
        console.error('Error during token verification', error);
        throw new Error('Not authorized to access this route');
    }
    
}

module.exports = { generateToken, verifyToken };
const User = require('../Models/userModel.js');
const { generateToken } = require('../utils/generatToken.js');
const bcrypt = require('bcryptjs');

const register = async(req, res) =>{
    const { userName, email, password } = req.body;

    if(!userName || !email || !password){
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    if(password.length < 6){
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const userExists = await User.findOne({ email });
    if(userExists){
        return res.status(400).json({ message: 'User already exists' });
    }

    try{
        const user = await User.create({ userName, email, password });
        const token = generateToken(user._id);
        res.status(201).json({ 
            message: 'User created successfully',
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
            },
            token });
        // user.save();
    }catch(error){
        if (error.code === 11000) {
            const duplicateKey = Object.keys(error.keyValue)[0];
            return res.status(400).json({ message: `${duplicateKey} already exists` });
        }
        console.error('error during user registration', error);
        res.status(500).json({ message: 'Server error' });
    }
}




const login = async(req, res) =>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: 'Please enter all fields' });
    }


    
    try{
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id);
        return res.status(200).json({ 
            message: 'User logged in successfully',
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role
            },
            token });
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
       
}


const updateUser = async(req, res) =>{
    const { userName, email, password } = req.body;

    if(!userName || !email || !password){
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    if(password.length < 6){
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(400).json({ message: 'You are not authorized to update this user' });
        }
        if(userName) user.userName = userName;
        if(email) user.email = email;
        if(password) user.password = password;

        const updatedUser = await user.save();
        return res.status(200).json({
            message: 'user updated successfully',
            user: {
                _id: updatedUser._id,
                userName: updatedUser.userName,
                email: updatedUser.email
            }
        })
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}



const deleteUser = async(req, res) =>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(400).json({ message: 'You are not authorized to delete this user' });
        }
        await User.findByIdAndDelete(user);
        return res.status(200).json({ message: 'User deleted successfully' });
    }catch(error){
        console.error('Error during user deletion', error);
        res.status(500).json({ message: 'Server error' });
    }

}


// module.exports = { register, login, updateUser, deleteUser };
module.exports = { register, login, updateUser, deleteUser };
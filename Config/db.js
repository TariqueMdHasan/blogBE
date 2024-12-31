const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log('Database connected successfully'))
        .catch((error) => console.log('Error connecting to the database', error));
    }catch(error){
        console.log('Error connecting to the database', error);
    }
}

module.exports = connectDB;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');


const connectDB = require('./Config/db.js');


const authRoutes = require('./Routes/authRoute.js');
const userRoutes = require('./Routes/userRoutes.js');
const blogRoutes = require('./Routes/blogRoute.js');
const commentRoutes = require('./Routes/commentRoute.js');
const { errorHandler } = require('./Middleware/errorMiddleware.js');





const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();


PORT = process.env.PORT || 5000;


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the server');
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
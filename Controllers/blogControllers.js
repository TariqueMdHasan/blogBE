const Blog = require('../Models/blogModel.js');

const getAllBlogs = async( req, res ) => {
    const blogs = await Blog.find().populate( "author", "username email" );
    return res.json( blogs );
}


const createBlog = async(req, res)=>{
    
    try{
        const blog = await Blog.create({
            ...req.body,
            author: req.user._id
        })
        const savedBlog = await blog.save();
        res.status(201).json({message: "Blog created successfully", blog: savedBlog});
    }catch(error){
        console.log("Error in creating blog", error);
        res.status(500).json({message: "Internal server error"}); 
    }
}



const updateBlog = async(req, res)=> {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if(!blog){
        return res.status(404).json({message: "Blog not found"});
    }

    if(blog.author.toString() !== req.user._id.toString()){
        return res.status(401).json({message: "You are not authorized to update this blog"});
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.json({message: "Blog updated successfully", blog: updatedBlog});
}


const deleteBlog = async(req, res)=> {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if(!blog){
        return res.status(404).json({message: "Blog not found"});
    }

    if(blog.author.toString() !== req.user._id.toString()){
        return res.status(401).json({message: "You are not authorized to delete this blog"});
    }

    await Blog.findByIdAndDelete(id);
    res.json({message: "Blog deleted successfully"});
}


module.exports = { getAllBlogs, createBlog, updateBlog, deleteBlog };
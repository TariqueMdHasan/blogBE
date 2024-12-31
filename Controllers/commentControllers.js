const Comments = require('../Models/commentModel.js');

const addComment = async(req, res)=> {
    try{
        const comment = new Comments({ ...req.body, author: req.userId });
        const savedComment = await comment.save();
        return res.status(200).json({ message: "Comment added successfully", savedComment });
    }catch(error){
        console.error(error);
        return res.status(500).json({msg: error.message});
    }
}


const updateComment = async(req, res)=> {
    const { id } = req.params;

    try{
        const comment = await Comments.findById(id);
        if(!comment) return res.status(404).json({message: "Comment not found"});
        if(comment.author !== req.userId){
            return res.status(403).json({message: "You can update only your comments"});
        }
        comment.content = req.body.content || comment.content;
        const updatedComment = await comment.save();
        // updateComment.save();
        return res.status(200).json({ message: "Comment updated successfully", updatedComment });
    }catch(error){
        console.error(error);
        return res.status(500).json({msg: error.message});
    }
}




const deleteComment = async(req, res) => {
    const { id } = req.params;

    try{
        const comment = await Comments.findById(id);
        if(!comment){
            return res.status(404).json({message: "Comment not found"});
        }
        if(!comment.user || !comment.user._id){
            return res.status(404).json({message: "Comment author not found"});
        }
        if(comment.user._id.toString() !== req.userId){
            return res.status(403).json({message: "You can delete only your comments"});
        }
        await comment.deleteOne();
        return res.status(200).json("Comment deleted successfully");

    }catch(error){
        console.error(error);
        return res.status(500).json({msg: error.message});
    }
}



const getCommentForBlogs = async(req, res) => {
    const { blogId } = req.params;

    try{
        const comments = await Comments.find({ blog: blogId }).populate("user", "userName email");
        return res.status(200).json(comments);
    }catch(error){
        console.error(error);
        return res.status(500).json({msg: error.message});
    }
}


module.exports = { addComment, updateComment, deleteComment, getCommentForBlogs };
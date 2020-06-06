const db = require("../database/index")

const getAllPosts = async (req,res,next) => {
    try{
        let posts = await db.any("SELECT * FROM posts ORDER by id DESC")
        res.status(200).json({
            status: "Success",
            message: "got all posts",
            body:posts,
        })
    }
        catch(error){
            console.log("unable to retreive all posts")
        }
    }


const getPostByUser = async (req,res, next) => {
    try{
        let posts = await db.any("SELECT *  FROM posts WHERE user_post_id = $1", req.params.id)
        res.status(200).json({
            status: "Success",
            message: "got posts by user",
            body: posts,

         })
    }catch(error){
        res.status(401).json({
            status: "fail",
            message: "did not get post by user"
        })
    }
}

const createPost = async (req,res, next) => {

    console.log(req)
    let {user_post_id,caption} = req.body
    try{
        let newPost = await db.one("INSERT INTO posts  (user_post_id, post_pic, caption) VALUES (${user_post_id}, ${post_pic}, ${caption}) RETURNING *", req.body)
        hashMaker(newPost)
        res.status(200).json({
            status: "Success",
            message: "Create Post",
            body: newPost

         })
    }catch(error){
        res.status(401).json({
            status: "fail",
            message: "did not create post"
        })
    }
}

const deletePost = async (req,res,next) => {
    try{
        await db.none("DELETE FROM posts WHERE id=$1", req.params.id)
        res.status(200).json({
            status: "Success",
            message: "Deleted Post"
         })
    }catch(error){
        res.status(401).json({
            status: "fail",
            message: "Unable to delete post"
        })
    }
}

const getSinglePost = async (req,res,next) => {
    try{
        let { id } = req.params
        let singlePost = await db.any("SELECT * FROM posts WHERE id =$1", [id])
        res.status(200).json({
            status: "Success",
            message: "Got single post by id: " + id,
            body: {
                singlePost
            }
        })
    } catch(error) {
        res.status(401).json({
            status: "fail",
            message: "Unable to get single post"
        })
    }
}

const editPost = async (req, res, next) => {
    try {
        let {caption} = req.body;
        let id = req.params.id;
        let user = await db.one(`UPDATE posts SET caption ='${caption}'WHERE id=${id} RETURNING *`);
        res.status(200).json({
            status: "success",
            message: "updated post",
            body: {
                user
            }
        })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "unable to update",
            payload: err
        })
        next()
    }
}

module.exports = { getAllPosts, getPostByUser, createPost, deletePost, getSinglePost, editPost}
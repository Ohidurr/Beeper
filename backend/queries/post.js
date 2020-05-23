const getAllPosts = async (req,res,next) => {
    try{
        let posts = await db.any("SELECT * FROM posts ORDER by id DESC")
        res.status(200).json({
            status: "Success",
            message: "got all posts",
            body:posts,
        })
        catch(error){
            console.log("unable to retreive all posts")
        }
    }
}
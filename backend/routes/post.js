const posts = require("express").Router()

const {  getAllPosts, getPostByUser, createPost, deletePost, getSinglePost, editPost} = require("../queries/post");

const { CheckToken } = require("../middleware/auth")

posts.get("/", CheckToken, getAllPosts);

posts.get("/:id", getPostByUser);

posts.get("/post/:id", getSinglePost)

 posts.post("/", createPost);

 posts.delete("/:id", deletePost)

module.exports = posts;
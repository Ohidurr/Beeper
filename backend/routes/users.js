const users = require('express').Router();
const {
  getSingleUserById,
  searchUsersByName,
  editUserInfo,
  getUsersPosts,
  createUser
} = require("../queries/usersQueries")


users.get("/:id", getSingleUserById)
users.get("/search/:userName", searchUsersByName)
users.patch("/:id", editUserInfo)
users.get("/posts/:id", getUsersPosts)
users.post("/", createUser)


module.exports = users;

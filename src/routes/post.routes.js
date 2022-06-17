const express = require("express");

const router = express.Router();
const {
  createPost,
  getAllPost,
  deletePost,
  updatePost,
  likePost,
  unLikePost,
  getPostUser,
} = require("../controllers/post.controller");
router.get("/", getAllPost);
router.get("/user/:slug", getPostUser);
router.post("/create", createPost);
router.delete("/delete/:id", deletePost);
router.put("/update/:id", updatePost);
router.put("/like/:id", likePost);
router.put("/unlike/:id", unLikePost);
module.exports = router;

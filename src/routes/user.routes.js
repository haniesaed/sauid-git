const express = require("express");
const router = express.Router();
const {
  login,
  register,

  AddFollowing,
  RemoveFollowing,
} = require("../controllers/user.controller");
router.post("/register", register);
router.post("/login", login);

router.put("/follow", AddFollowing);
router.put("/unfollow", RemoveFollowing);
module.exports = router;

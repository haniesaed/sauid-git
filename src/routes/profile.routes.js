const express = require("express");
const router = express.Router();
const {
  UserDetails,
  UpdateUser,
} = require("../controllers/profile.controller");
router.get("/:slug", UserDetails);
router.put("/update/:id", UpdateUser);
module.exports = router;

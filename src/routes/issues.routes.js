const express = require("express");

const router = express.Router();
const {
    createissues,
    getAllissues,
    deleteissues,
    updateissues,
} = require("../controllers/Issues.controller");
router.get("/", getAllissues);
router.post("/create", createissues);
router.delete("/delete/:id", deleteissues);
router.put("/update/:id", updateissues);
module.exports = router;
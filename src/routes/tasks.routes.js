const express = require("express");

const router = express.Router();
const {
  AddTask,
  Tasks,
  DeleteTask,
  EditTask,
  ChangeStatus,
  GetTask,
} = require("../controllers/task.controller");
router.get("/", Tasks);
router.get("/:id", GetTask);
router.post("/add", AddTask);
router.delete("/delete/:id", DeleteTask);
router.put("/edit/:id", EditTask);
router.put("/status/:id", ChangeStatus);
module.exports = router;

const User = require("../models/user.model");
const issues = require("../models/Issues.model");
const getId = require("../utils/getID");
const jwt = require("jsonwebtoken");

const createissues = async (req, res, next) => {
  const token = req.header("auth_token");
  const  userid= getId(token);

  const User = awaitrepository.findOne({ _id: userid});
  if (!User) {
    return next(new AppError("No user exists with that ID", 404));
  }
  console.log("S");
  const newissues = new issues({
    user:user,
    userid:userid,
    issues: req.body.issues,
  });
  await newissues.save();

  res.status(201).json({
    status: "success",
    data: {
      newissues,
    },
  });
};

const getAllissues = async (req, res) => {
  const Issues = await issues.find();

  res.status(200).json({
    status: "success",
    data: {
      IssuesLength: Issues.length,
      Issues,
    },
  });
};

const deleteissues = async (req, res, next) => {
  const issues = await issues.findById(req.params.id);

  if (!issues) {
    return next(new AppError("No issues not found with specified id", 404));
  }

  await issues.remove();

  res.status(204).json({
    status: "success",
    message: "issues removed",
  });
};
const updateissues = async (req, res, next) => {
  try {
    const issues = await issues.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!issues) {
      return next(new AppError("No issues not found with specified id", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        issues,
      },
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = {
  createissues,
  getAllissues,
  deleteissues,
  updateissues,
};

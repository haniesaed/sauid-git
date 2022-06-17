const taskModel = require('../models/task.model')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const getId = require('../utils/getID')
const Tasks = async (req, res) => {
  const token = req.header('auth_token')
  const userId = getId(token)

  try {
    const tasks = await taskModel.find({ userId })
    res.json({
      data: tasks,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
const AddTask = async (req, res) => {
  try {
    const { title, subject } = req.body
    const token = req.header('auth_token')

    const id = getId(token)

    const user = await userModel.findOne({ _id: id })
    if (!user)
      return res.status(403).json({
        message: '403 ',
      })
    const newTask = new taskModel({
      title,
      subject,
      date: moment().format('MMMM Do YYYY'),
      status: 'todo',
      userId: id,
    })
    await newTask.save()
    res.status(200).json({
      message: 'succes the Task added successfully ^^',
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const GetTask = async (req, res) => {
  const _id = req.params.id
  try {
    await taskModel.find({ _id }).then((task) => {
      if (!task)
        return res.status(404).json({
          statuscode: 404,
          message: 'Task Not Found',
        })
      else
        res.status(200).json({
          data: task,
        })
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
const DeleteTask = async (req, res) => {
  const _id = req.params.id
  try {
    await taskModel.findOneAndDelete({ _id }).then((task) => {
      if (!task)
        return res.status(404).json({
          statuscode: 404,
          message: 'Task Not Found',
        })
      else
        res.status(200).json({
          message: 'Delete successed',
        })
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const EditTask = (req, res) => {
  const _id = req.params.id
  try {
    taskModel.findOneAndUpdate(
      { _id },
      { $set: req.body },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(422).json({
            message: 'Something wrong when updating data!',
          })
        }

        res.status(200).json({
          message: 'Edit Succefully',
        })
      },
    )
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
const ChangeStatus = (req, res) => {
  const _id = req.params.id
  taskModel.findOneAndUpdate(
    { _id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(422).json({
          message: 'Something wrong when updating data!',
        })
      }

      res.status(200).json({
        message: 'Edit Succefully',
      })
    },
  )
}
module.exports = {
  AddTask,
  Tasks,
  DeleteTask,
  GetTask,
  EditTask,
  ChangeStatus,
}

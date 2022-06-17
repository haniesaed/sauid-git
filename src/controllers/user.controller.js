const userModel = require('../models/user.model')
const Exception = require('../exception/RigestryException')
const generateToken = require('../utils/generateToken')
const getId = require('../utils/getID')
const moment = require('moment')
const jwt = require('jsonwebtoken')

//controller for register
const register = async (req, res) => {
  const { name, email, password, repassword } = req.body
  const user = await userModel.findOne({ email })
  if (user) {
    return res.status(201).json({ message: 'Email already token !' })
  } else if (password.trim() === '' || name.trim() === '')
    return res.status(401).send({ message: Exception.isEmpty })
  else if (password !== repassword)
    return res.status(401).send({ message: Exception.isNotMatch })
  else if (password.length < 8)
    return res.status(401).send({ message: Exception.isNotLong })
  try {
    const newUser = new userModel({
      name,
      email,
      password,
      date: moment().format('MMMM Do YYYY'),
    })
    await newUser.save()
    res.status(200).json({
      data: true,
      message: 'succes the account is created successfully ^^',
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

//controller for login
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        data: generateToken(user._id),
        slug: user.slug,
      })
    } else {
      res.status(401).json({
        message: 'Invalid email or Password',
      })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const AddFollowing = async (req, res, next) => {
  const { _id } = req.body
  const token = req.header('auth_token')
  const userId = getId(token)

  const user1 = await userModel.findById({ _id: userId })
  const user2 = await userModel.findById(_id)
  try {
    if (user1.following.some((el) => String(el.userID) === _id)) {
      return next()
    }

    user1?.following?.unshift({
      userID: _id,
      userName: user2?.name,
      userSlug: user2?.slug,
    })
    user2?.followers?.unshift({
      userID: userId,
      userName: user1?.name,
      userSlug: user1?.slug,
    })
    await user1.save()
    await user2.save()

    res.json({
      message: 'success',
    })
  } catch (error) {
    res.json({
      message: error.message,
    })
  }
}
const RemoveFollowing = async (req, res, next) => {
  const { _id } = req.body
  const token = req.header('auth_token')
  const userId = getId(token)

  const user1 = await userModel.findById({ _id: userId })
  const user2 = await userModel.findById(_id)
  try {
    if (user1.following.some((el) => String(el.userID) !== _id)) {
      return next()
    }

    const f1 = user1?.following?.filter(
      (el) => String(el.userID) !== String(_id),
    )
    user1.following = f1
    const f2 = user1?.followers?.filter(
      (el) => String(el.userID) !== String(userId),
    )
    user2.followers = f2

    await user1.save()
    await user2.save()

    res.json({
      message: 'success',
    })
  } catch (error) {
    res.json({
      message: error.message,
    })
  }
}

module.exports = {
  register,
  login,

  AddFollowing,
  RemoveFollowing,
}

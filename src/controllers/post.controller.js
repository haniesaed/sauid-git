const User = require('../models/user.model')
const Post = require('../models/post.model')
const getId = require('../utils/getID')

const createPost = async (req, res, next) => {
  const token = req.header('auth_token')
  const userId = getId(token)
  try {
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return next(new AppError('No user exists with that ID', 404))
    }
    console.log('S')
    const newPost = new Post({
      user: user,
      userId: userId,
      post: req.body.post,
    })
    await newPost.save()

    res.status(201).json({
      status: 'success',
      data: {
        newPost,
      },
    })
  } catch (err) {}
}

const getPostUser = async (req, res) => {
  const { slug } = req.params
  try {
    const user = await User.find({ slug })

    const post = await Post.find({ userId: String(user[0]._id) })

    res.json(post)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()

    res.status(200).json({
      status: 'success',
      data: {
        postsLength: posts.length,
        posts,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return next(new AppError('No post not found with specified id', 404))
    }

    await post.remove()

    res.status(204).json({
      status: 'success',
      message: 'Post removed',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!post) {
      return next(new AppError('No post not found with specified id', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    })
  } catch (error) {
    res.json({
      message: error.message,
    })
  }
}
const likePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id)

  const { id } = req.body

  //If post has already been like

  try {
    if (post?.likes?.some((el) => el.user.toString() === id)) {
      return next()
    }

    post?.likes?.unshift({ user: id })

    await post.save()

    res.status(200).json({
      status: 'success',
      data: {
        likes: post.likes,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const unLikePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id)
  const { id } = req.body
  //If post has not been liked
  try {
    if (!post.likes.some((el) => el.user.toString() === id)) {
      return next()
    }

    const filter = post.likes.filter((el) => {
      return el.user.toString() !== id
    })

    post.likes = filter
    await post.save()

    res.status(200).json({
      status: 'success',
      data: {
        likes: post.likes,
      },
    })
  } catch (err) {
    res.json({ mesage: '500' })
  }
}
module.exports = {
  createPost,
  getAllPost,
  deletePost,
  updatePost,
  likePost,
  unLikePost,
  getPostUser,
}

const userModel = require('../models/user.model')

// Get  user Details
const UserDetails = async (req, res) => {
  const { slug } = req.params
  try {
    const user = await userModel.findOne({ slug: slug })
    if (user) return res.status(200).json({ data: user })
    else return res.status(404).json({ data: null })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const UpdateUser = async (req, res) => {
  const { id } = req.params

  try {
    userModel.findOneAndUpdate(
      { _id: id },
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
module.exports = {
  UserDetails,
  UpdateUser,
}

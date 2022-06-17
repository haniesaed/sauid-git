const { validateRepository, Repo } = require('../models/repository.model')

const getId = require('../utils/getID')

const insertrepo = async (req, res) => {
  try {
    const token = req.header('auth_token')

    const id = getId(token)
    const repo = await Repo.findOne({
      name: req.body.name,
      creator: id,
    })

    if (repo) return res.status(404).send('The repository is Found.')
    const repository = new Repo({
      name: req.body.name,
      description: req.body.description,
      creator: id,
      members: [],
    })

    await repository.save()
    res.send(repository)
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}

const updaterepo = async (req, res) => {
  const token = req.header('auth_token')

  const id = getId(token)
  try {
    const repository = await Repo.findOneAndUpdate(
      { _id: req.params.id, creator: id },
      { name: req.body.name, description: req.body.description },
      {
        new: true,
      },
    )

    if (!repository)
      return res
        .status(404)
        .send('The repository with the given ID was not found.')

    res.send(repository)
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}
const deleterepo = async (req, res) => {
  const token = req.header('auth_token')

  const id = getId(token)
  try {
    const repository = await Repo.findOneAndDelete({
      _id: req.params.id,
      creator: id,
    })

    if (!repository)
      return res
        .status(404)
        .send('The repository with the given ID was not found.')

    res.send(repository)
  } catch (error) {}
}
const uploadFiles = async (req, res) => {
  if (!req.file) return res.status(404).send('No file uploaded.')

  let file = req.file
  //send response
  res.send({
    status: true,
    message: 'File is uploaded',
    data: {
      name: file.path,
      mimetype: file.mimetype,
      size: file.size,
    },
  })
}
const searchCondition = async (req, res) => {
  let searchCondition = { creator: req.user._id }

  let repositories = await Repository.find().select('-__v').sort('name')
  res.send(repositories)
}
const getrepo = async (req, res) => {
  const repository = await Repo.find({
    creator: req.params.id,
  })

  if (!repository)
    return res
      .status(404)
      .send('The repository with the given ID was not found.')

  res.send(repository)
}
module.exports = {
  insertrepo,
  updaterepo,
  deleterepo,
  uploadFiles,
  searchCondition,
  getrepo,
}

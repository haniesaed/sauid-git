const { Repository } = require("../models/repository.model");
const getId = require("../utils/getID");
module.exports = async function (req, res, next) {
  const token = req.header("auth_token");

  const id = getId(token);
  try {
    const repository = await Repository.findOne({
      _id: req.params.id,
      creator: id,
    });

    if (!repository)
      return res
        .status(404)
        .send("The repository with the given ID was not found.");

    next();
  } catch (ex) {
    return res
      .status(404)
      .send("The repository with the given ID was not found.");
  }
};

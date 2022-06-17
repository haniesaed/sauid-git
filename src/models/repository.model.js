const Joi = require("joi");
const { Schema, model } = require("mongoose");

const repositorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
    trim: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  rates: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
});

function validateRepository(repository) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    //membersId: Joi.array().items(Joi.objectId()),
  });

  return schema.validate("fjikadnfi");
}

const Repo = model("Repository", repositorySchema);
module.exports = { Repo, validateRepository };

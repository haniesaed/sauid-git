const { Schema, model } = require("mongoose");
const postSchema = new Schema({
  user: [
    {
      type: {},
      ref: "user",
      required: [true, "Post must belong to a user"],
      unique: false,
    },
  ],
  userId: {
    ref: "user",
    type: Schema.Types.ObjectId,
  },
  post: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      comment: {
        type: String,
      },
      commentLikes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
    },
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = posts = model("post", postSchema);

const { Schema, model } = require("mongoose");
const issuesSchema = new Schema({
  user: [
    {
      type: {},
      ref: "user",
      required: [true, "issues must belong to a user"],
      unique: false,
    },
  ],
  userid: {
    ref: "user",
    type: Schema.Types.ObjectId,
  },
  issues: {
    type: String,
    required: true,
  },
  
  },
);

module.exports = issues = model("issues", issuesSchema);


const { Schema, model, plugin } = require("mongoose");

const bcrypt = require("bcryptjs");
const slug = require("mongoose-slug-generator");
plugin(slug);
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: ["name"],
  },
  followers: [
    {
      userID: { type: Schema.Types.ObjectId },
      userName: { type: String },
      userSlug: { type: String },
    },
  ],
  following: [
    {
      userID: { type: Schema.Types.ObjectId },
      userName: { type: String },
      userSlug: { type: String },
    },
  ],
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = User = model("user", userSchema);

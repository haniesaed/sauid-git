/*const Mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
  },
  profession: {
      type: String,
      required: true,
  },
  goalToAchieve: {
      type: String,
      required: true,
  },
  expertiseLevel: {
      type: String,
      required: true,
      default: 'Beginner',
      enum: ['beginner', 'intermediate', 'expert'],
  },
  dailyTime: {
      type: String,
      required: true,
  },
},
{
  timestamps: true,
}
);

const UserProfile = mongoose.model('UserProfile', UserSchema)

export default UserProfile*/
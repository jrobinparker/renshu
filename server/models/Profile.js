const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  level: {
    type: String
  },
  location: {
    type: String
  },
  interests: {
    type: [String]
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  likes: [
    {
      lesson: {
        type: Schema.Types.ObjectId,
        ref: 'lessons'
      }
    }
  ],
  completes: [
    {
      lesson: {
        type: Schema.Types.ObjectId,
        ref: 'lessons'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

const Profile = mongoose.model('profile', ProfileSchema)

module.exports = Profile

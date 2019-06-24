const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define model
const LessonSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  mainContent: {
    type: String
  },
  body: {
    type: String
  },
  youtubeURL: {
    type: String
  },
  level: {
    type: String
  },
  author: {
    type: String
  },
  authorId: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  completes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  flashCards: {
    type: Array
  },
  created: {
    type: Date,
    default: Date.now
  }
})

// Create model class
const Lessons = mongoose.model('lesson', LessonSchema)

// Export model
module.exports = Lessons

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define model
const CourseSchema = new Schema({
  title: {
    type: String
  },
  description: {
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
  lessons: [
    {
      lesson: {
        type: Schema.Types.ObjectId,
        ref: 'lessons'
      }
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
})

// Create model class
const Courses = mongoose.model('course', CourseSchema)

// Export model
module.exports = Courses

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define model
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// Create model class
const Users = mongoose.model('user', UserSchema)

// Export model
module.exports = Users

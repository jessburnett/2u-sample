const mongoose = require('mongoose');

//courses data model
const CourseSchema = mongoose.Schema({
  //create relationship between user and courses
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    require: true
  },
  instructor: {
    type: String,
    require: true
  },
  type: {
    type: String,
    default: 'paid'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('course', CourseSchema);
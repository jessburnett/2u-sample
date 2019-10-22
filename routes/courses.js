const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//middleware
const auth = require('../middleware/auth');

//models
const User = require('../models/Users');
const Course = require('../models/Courses');


// @route  GET api/courses
// @desc Get all users courses
// @access Private
// @postman GET method test: http://localhost:5000/api/courses
router.get('/', auth, async (req, res)=> {
  try {
    const courses = await Course.find({ user: req.user.id }).sort({
      date: -1 
    });

    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route  POST api/courses
// @desc Add new courses
// @access Private
// @postman SEND method test: http://localhost:5000/api/courses
router.post('/', (req, res)=> {
  res.send('Add course');
});

// @route  PUT api/courses/:id
// @desc Update course
// @access Private
// @postman PUT method test: http://localhost:5000/api/courses/1

router.put('/:id', (req, res)=> {
  res.send('Update course');
});


// @route  DELETE api/courses/:id
// @desc Delete course
// @access Private
// @postman DELETE method test: http://localhost:5000/api/courses/1
router.delete('/:id', (req, res)=> {
  res.send('Delete course');
});

module.exports = router;
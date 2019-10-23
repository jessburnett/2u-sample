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
router.post('/', [auth, [
 check('title', 'Please enter a title').not().isEmpty(),
 check('instructor', 'Please enter an instructor').not().isEmpty(),
 check('type', 'Please enter free or paid as type').not().isEmpty()
]], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, instructor, type } = req.body;

  try {
    let course = await Course.findOne({ title });

    if(course){
      return res.status(400).json({ msg: "Course already exists"});
    }

    course = new Course({
      title,
      instructor,
      type,
      user: req.user.id
    });

    await course.save();

  } catch (error) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route  PUT api/courses/:id
// @desc Update course
// @access Private
// @postman PUT method test: http://localhost:5000/api/courses/1

router.put('/:id', auth, 
async (req, res)=> {
  const { title, instructor, type, user } = req.body;

  //build course obj
  const courseFields = {};
  if(title) courseFields.title = title;
  if(instructor) courseFields.instructor = instructor;
  if(type) courseFields.type = type;
  if(user) courseFields.user = user;

  try {
    let course = await Course.findById(req.params.id);

    if(!course) return res.status(401).json({ msg: "Course not found" });

    //make sure user owns course
    if(course.user.toString() !== req.user.id) return res.status(404).json({ msg: "User not authorized" });

    course = await Course.findByIdAndUpdate(req.params.id);
    res.json({ msg: "Course Removed" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/courses/:id
// @desc Delete course
// @access Private
// @postman DELETE method test: http://localhost:5000/api/courses/1
router.delete('/:id', auth, 
  async (req, res)=> {
    try {
      let course = await Course.findById(req.params.id);
  
      if(!course) return res.status(401).json({ msg: "Course not found" });
  
      //make sure user owns course
      if(course.user.toString() !== req.user.id) {
        return res.status(404).json({ msg: "User not authorized" });
      }

      await Course.findByIdAndRemove();
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;
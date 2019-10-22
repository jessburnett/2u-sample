const express = require('express');
const router = express.Router();

// @route  GET api/auth
// @desc Get logged in user
// @access Private
// @postman test: http://localhost:5000/api/auth

router.get('/', (req, res)=> {
  res.send('Get logged in user');
});

// @route  POST api/auth
// @desc Auth user & get token
// @access Public
// @postman test: http://localhost:5000/api/auth
router.post('/', (req, res)=> {
  res.send('Log in user');
});

module.exports = router;
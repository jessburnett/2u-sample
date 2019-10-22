const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');

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
router.post('/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', "Password is required").exists()
  ],
 async (req, res) => {
  const errors = validationResult(req);
 
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({ msg: "Invalid Credentials" })
    }

    //compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({ msg: "Invalid Credentials" })
    }

    const payload = {
      user: {
        id: user.id
      }
    }
    //decode here: https://jwt.io/home/
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if(err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
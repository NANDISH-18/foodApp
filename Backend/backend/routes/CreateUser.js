const express = require('express');
const router = express.Router();
const User = require('../models/Users');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'NadishfoodAppwithMernStack@2024'

// Express validation
const { body, validationResult } = require('express-validator');

// post user
router.post('/createUser',
  body("email").isEmail(),
  body("name", "please give correct name").isLength({ min: 3 }),
  body("password", "incorrect Password").isLength({ min: 4 }),
  async (req, res) => {


    // Check for validation errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    // For bcrypt password to secure the password
    const salt = await bcrypt.genSalt();
    const secPassword = await bcrypt.hash(req.body.password, salt);

    // If no validation errors, proceed to create the user
    try {
      const newUser = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      });

      res.json({ success: true, user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);


router.post('/loginuser', [
  body("email").isEmail(),
  body("password", "incorrect Password").isLength({ min: 4 }),
], async (req, res) => {
  try {
    // Check for validation errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find the user by email
    const userData = await User.findOne({ email });

    // Check if user exists
    if (!userData) {
      return res.status(400).json({ errors: "Try logging with correct credential, email invalid" });
    }

    // Check if password matches
    // Check bCrypt password
    const pwdMatch = bcrypt.compare(password,userData.password)
    if (!pwdMatch) {
      return res.status(400).json({ errors: "Try logging with correct credential, password invalid" });
    }

    // Login with jwt token
    const data = {
      user:{
        id: userData.id
      }
    }
    
    const authToken = jwt.sign(data,secretKey);



    // User authenticated successfully
    return res.json({ success: true, authToken });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;

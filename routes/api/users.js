const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load user model
const User = require('../../models/User');

// Input validation
const validateRegistrationInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// @route GET api/users/test
// @desc Test users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Users route works' }));

// @route GET api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists!'
        return res.status(400).json(errors)
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => rs.json(err))
          })
        })
      }
    })
})

// @route GET api/users/login
// @desc Login user / return jwt token
// @access Public
router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found.'
        return res.status(400).json(errors)
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, name: user.name };
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            )
          } else {
            errors.password = 'Password incorrect.'
            return res.status(400).json(errors)
          }
        })
    })
})

// @route GET api/users/current
// @desc Return current user data
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router;

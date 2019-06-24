const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// Input validation
const validateProfileInput = require('../../validation/profile')

// @route GET api/profile
// @desc Get current user profile
// @access Private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ noProfile: 'No profile found for this user' })
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public

router.get('/handle/:handle', (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .then(profile => {
      if (!profile) {
        res.status(404).json({ msg: 'No profile found for this user!' })
      }

      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public

router.get('/user/:user_id', (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .then(profile => {
      if (!profile) {
        res.status(404).json({ msg: 'No profile found for this user!' })
      }

      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route POST api/profile
// @desc Create and edit user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const profileFields = {}
  profileFields.user = req.user.id
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.level) profileFields.level = req.body.level;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.level) profileFields.level = req.body.level;
  if (typeof req.body.interests !== 'undefined') {
    profileFields.interests = req.body.interests.split(',');
  }
  profileFields.social = {}
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profileFields.handle === '') {
      return res.status(400).json(errors)
    }

    if (profile && profileFields.level === '') {
      return res.status(400).json(errors)
    }

    if (profile) {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile))
    } else {
      Profile.findOne({ handle: profileFields.handle }).then(
        profile => {
          if (profile) {
            res.status(404).json({ msg: 'That handle already exists!' })
          }

          new Profile(profileFields)
            .save()
            .then(profile => res.json(profile))
        }
      )
    }
  })
})

module.exports = router;

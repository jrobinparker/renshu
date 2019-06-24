const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Lesson = require('../../models/Lesson');
const Profile = require('../../models/Profile');

// @route GET api/lessons
// @desc Get all lessons
// @access Public

router.get('/', (req, res) => {
  Lesson.find()
    .sort({ title: -1 })
    .then(lessons => res.json(lessons))
    .catch(err => res.status(404))
})

// @route GET api/lessons/:id
// @desc Get lesson by ID
// @access Public

router.get('/:id', (req, res) => {
  Lesson.findById(req.params.id)
    .then(lesson => res.json(lesson))
    .catch(err => res.status(404).json({ nolessonfound: 'No lesson found with that ID' }))
})

// @route POST api/lessons/new
// @desc Create a new lesson
// @access Private

router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {


  const lessonData = new Lesson({
    title: req.body.title,
    description: req.body.description,
    mainContent: req.body.mainContent,
    youtubeURL: req.body.youtubeURL,
    level: req.body.level,
    type: req.body.type,
    author: req.body.author,
    authorId: req.body.authorId,
    flashCards: req.body.flashCards
  })

  lessonData.save().then(lesson => res.json(lesson))
})

// @route PUT api/lessons/:id
// @desc Edit lesson
// @access Private

router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Lesson.findById(req.params.id)
        .then(lesson => {
          if (lesson.authorId !== req.user.id) {
            return res.status(404).json({ notauthorized: 'You are not authorized to edit this lesson.' })
          }
          Lesson.findByIdAndUpdate(
            req.body.id,
            req.body,
            { new: true }
          ).then(lesson => res.json(lesson))
        }).catch(err => res.status(404).json({ nolessonfound: 'No lesson found with that ID' }))
    })
})

// @route DELETE api/lessons/:id
// @desc Create a new lesson
// @access Private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Lesson.findById(req.params.id)
    .then(lesson => {
      lesson.remove().then(() => res.json({ success: true }))
    })
    .catch(err => res.status(404).json({ nolessonfound: 'No lesson found with that ID' }))
})

// @route POST api/lessons/like/:id
// @desc Like lesson
// @access Private

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Lesson.findById(req.params.id)
        .then(lesson => {
          if (lesson.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'You already liked this lesson!' })
          }

          lesson.likes.unshift({ user: req.user.id })
          lesson.save().then(lesson => res.json(lesson))
        })
    .catch(err => res.status(404).json({ nolessonfound: 'No lesson found with that ID' }))
  })
})

// @route POST api/lessons/unlike/:id
// @desc Unlike lesson
// @access Private

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Lesson.findById(req.params.id)
        .then(lesson => {
          if (lesson.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: 'You have not yet liked this lesson!' })
          }

          // get remove index
          const removeIndex = lesson.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

          // splice out of array
          lesson.likes.splice(removeIndex, 1)

          // save
          lesson.save().then(lesson => res.json(lesson))
        })
    .catch(err => res.status(404).json({ nolessonfound: 'No lesson found with that ID' }))
})
})

// @route POST api/lessons/complete/:id
// @desc Complete lesson
// @access Private

router.post('/complete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Lesson.findById(req.params.id)
        .then(lesson => {
          if (lesson.completes.filter(complete => complete.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadycomplete: 'You already completed this lesson!' })
          }

          lesson.completes.unshift({ user: req.user.id })
          lesson.save().then(lesson => res.json(lesson))
        })
    .catch(err => res.status(404).json({ nolessonfound: 'No lesson found with that ID' }))
  })
})

// @route POST api/lessons/uncomplete/:id
// @desc Remove complete from lesson
// @access Private

router.post('/uncomplete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Lesson.findById(req.params.id)
        .then(lesson => {
          if (lesson.completes.filter(complete => complete.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notcomplete: 'You have not yet completed this lesson!' })
          }

          // get remove index
          const removeIndex = lesson.completes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

          // splice out of array
          lesson.completes.splice(removeIndex, 1)

          // save
          lesson.save().then(lesson => res.json(lesson))
        })
    .catch(err => res.status(404).json({ nolessonfound: 'No lesson found with that ID' }))
    })
})

module.exports = router

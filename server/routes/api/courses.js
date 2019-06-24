const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Course = require('../../models/Course');
const Lesson = require('../../models/Lesson');
const Profile = require('../../models/Profile');

// @route GET api/lessons
// @desc Get all lessons
// @access Public

router.get('/', (req, res) => {
  Course.find()
    .sort({ title: -1 })
    .then(courses => res.json(courses))
    .catch(err => res.status(404))
})

// @route GET api/lessons/:id
// @desc Get lesson by ID
// @access Public

router.get('/:id', (req, res) => {
  Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(404).json({ nocoursefound: 'No course found with that ID' }))
})

// @route POST api/lessons/new
// @desc Create a new lesson
// @access Private

router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
  const courseData = new Course({
    title: req.body.title,
    description: req.body.description,
    level: req.body.level,
    author: req.body.author,
    authorId: req.body.authorId,
    lessons: req.body.lessons
  })

  courseData.save().then(course => res.json(course))
})

// @route PUT api/lessons/:id
// @desc Edit lesson
// @access Private

router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true })
    .then(course => res.json(course))
    .catch(err => res.status(404).json({ nocoursefound: 'No course found with that ID' }))
})

// @route DELETE api/lessons/:id
// @desc Create a new lesson
// @access Private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
      Course.findById(req.params.id)
        .then(course => {
          course.remove().then(() => res.json({ success: true }))
        })
    .catch(err => res.status(404).json({ nocoursefound: 'No course found with that ID' }))
  })

// @route POST api/lessons/like/:id
// @desc Like lesson
// @access Private

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Course.findById(req.params.id)
        .then(course => {
          if (course.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'You already liked this course!'})
          }

          course.likes.unshift({ user: req.user.id })
          course.save().then(course => res.json(course))
        })
    .catch(err => res.status(404).json({ nocoursefound: 'No course found with that ID' }))
  })
})

// @route POST api/lessons/unlike/:id
// @desc Unlike lesson
// @access Private

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Course.findById(req.params.id)
        .then(course => {
          if (course.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: 'You have not yet liked this course!'})
          }

          // get remove index
          const removeIndex = course.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

          // splice out of array
          course.likes.splice(removeIndex, 1)

          // save
          course.save().then(course => res.json(course))

        })
    .catch(err => res.status(404).json({ nocoursefound: 'No course found with that ID' }))
  })
})

// @route POST api/lessons/complete/:id
// @desc Complete lesson
// @access Private

router.post('/complete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Course.findById(req.params.id)
        .then(course => {
          if (course.completes.filter(complete => complete.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadycomplete: 'You already completed this course!'})
          }

          course.completes.unshift({ user: req.user.id })
          course.save().then(course => res.json(course))
        })
    .catch(err => res.status(404).json({ nocoursefound: 'No course found with that ID' }))
  })
})

// @route POST api/lessons/uncomplete/:id
// @desc Remove complete from lesson
// @access Private

router.post('/uncomplete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Course.findById(req.params.id)
        .then(course => {
          if (course.completes.filter(complete => complete.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notcomplete: 'You have not yet completed this course!'})
          }

          // get remove index
          const removeIndex = course.completes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

          // splice out of array
          course.completes.splice(removeIndex, 1)

          // save
          course.save().then(course => res.json(course))

        })
    .catch(err => res.status(404).json({ nocoursefound: 'No course found with that ID' }))
  })
});

module.exports = router;

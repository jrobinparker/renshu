const express = require('express');
const router = express.Router();

// @route GET api/courses/test
// @desc Test courses route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Courses route works' }));

module.exports = router;

const express = require('express');
const router = express.Router();

// @route GET api/lessons/test
// @desc Test lessons route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Lessons route works' }));

module.exports = router;

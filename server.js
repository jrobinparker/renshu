const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const lessons = require('./routes/api/lessons');
const courses = require('./routes/api/courses');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Setup
const db = require('./config/keys').mongoURI;

// Connect to DB
mongoose.connect(db).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users/', users);
app.use('/api/profile/', profile);
app.use('/api/lessons/', lessons);
app.use('/api/courses/', courses);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`))

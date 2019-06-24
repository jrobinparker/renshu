const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const lessons = require('./routes/api/lessons');
const courses = require('./routes/api/courses');

const app = express();

// DB Setup
const db = require('./config/keys').mongoURI;

// Connect to DB
mongoose.connect(db).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello world'));

// Routes
app.use('/api/users/', users);
app.use('/api/profile/', profile);
app.use('/api/lessons/', lessons);
app.use('/api/courses/', courses);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`))

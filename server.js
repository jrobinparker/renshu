const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./server/routes/api/users');
const lessons = require('./server/routes/api/lessons');
const courses = require('./server/routes/api/courses');
const profile = require('./server/routes/api/profile');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Setup
const db = require('./server/config/keys').mongoURI
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// Connect to DB
mongoose.connect(db).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./server/config/passport')(passport);

// Routes
app.use('/api/users/', users);
app.use('/api/profile/', profile);
app.use('/api/lessons/', lessons);
app.use('/api/courses/', courses);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`));

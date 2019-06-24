const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB Setup
const db = require('./config/keys').mongoURI;

// Connect to DB
mongoose.connect(db).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello world'))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`))

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const passportStrategy = require('./middleware/passport-strategy');

const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');

const keys = require('./keys');

const app = express();

mongoose.connect(keys.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.use(cors());
app.use(passport.initialize());
passport.use(passportStrategy);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/message', messageRoutes);

module.exports = app;

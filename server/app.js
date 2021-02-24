const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const passportStrategy = require('./middleware/passport-strategy');
const authUserRoutes = require('./routes/authUser.routes');

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

app.use(passport.initialize());
passport.use(passportStrategy);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authUserRoutes);

module.exports = app;

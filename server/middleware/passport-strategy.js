const { Strategy, ExtractJwt } = require('passport-jwt');
const keys = require('../keys');
const User = require('../models/user.model');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT,
};

module.exports = new Strategy(options, async (payload, done) => {
  try {
    const candidateUser = await User.findById(payload.userId).select('id');
    if (candidateUser) {
      done(null, candidateUser);
    } else {
      done(null, false);
    }
  } catch (e) {
    console.error(e);
  }
});

const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    unique: false,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: false,
  },
  messages: [
    {
      type: ObjectId,
      ref: 'Message',
    },
  ],
});

module.exports = model('users', userSchema);

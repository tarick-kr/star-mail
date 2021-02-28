const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const schema = new Schema({
  subject: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    unique: false,
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
});

module.exports = model('Message', schema);

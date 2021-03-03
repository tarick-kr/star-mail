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
  textWithoutHtml: {
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
  userId: {
    type: ObjectId,
    ref: 'User',
  },
});

module.exports = model('Message', schema);

const Message = require('../models/Message');

module.exports.createMessage = async (req, res) => {
  try {
    const message = new Message({
      subject: req.body.subject,
      text: req.body.text,
      email: req.body.email,
      date: req.body.date,
      // userId: req.body.userId
    });
    await message.save();
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.deleteMessage = async (req, res) => ({});

module.exports.fetchMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).json(e);
  }
};

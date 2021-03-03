const Message = require('../models/Message');
const User = require('../models/User');

module.exports.createMessage = async (req, res) => {
  try {
    const message = new Message({
      subject: req.body.subject,
      text: req.body.textMail,
      textWithoutHtml: req.body.textMailWithoutHtml,
      email: req.body.email,
      date: req.body.date,
      userId: req.body.userId,
    });
    await message.save();

    const user = await User.findById(req.body.userId);
    user.messages.push(message._id);
    await user.save();

    res.status(201).json({ message: 'Сообщение успешно создано!' });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.fetchMessages = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('messages');
    const messages = user.messages.sort((a, b) => (a.date > b.date ? -1 : 1));
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.fetchMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    res.status(200).json(message);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.deleteMessage = (req, res) => ({
  // try {
  //   const message = await Message.findById(req.params.messageId);
  //   res.status(200).json(message);
  // } catch (e) {
  //   res.status(500).json(e);
  // }
});

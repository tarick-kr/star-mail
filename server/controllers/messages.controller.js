const Message = require('../models/Message');
const User = require('../models/User');

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
    // res.status(500).json({ message: 'Такая рассылка не найдена' });
  }
};

module.exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.messageId);
    res.status(200).json({ message: 'Сообщение успешно удалено!' });
  } catch (e) {
    res.status(500).json(e);
  }
};

const keys = require('../keys');
const { sendEmail } = require('../middleware/mailer');

const Message = require('../models/Message');
const User = require('../models/User');

module.exports.sendMessage = async (req, res) => {
  try {
    const message = new Message({
      subject: req.body.subject,
      text: req.body.textMail,
      textWithoutHtml: req.body.textMailWithoutHtml,
      emailsArray: req.body.emailsArray,
      emailsString: req.body.emailsString,
      date: req.body.date,
      userId: req.body.userId,
    });
    await message.save();

    const user = await User.findById(req.body.userId);
    user.messages.push(message._id);
    await user.save();

    const mail = {
      from: `S.TAR.MAIL <${keys.EMAIL}>`,
      to: req.body.emailsArray,
      subject: req.body.subject,
      html: `
          ${req.body.textMail}
          <br>
          <br>
          <br>
          <hr>
          <br>
          <p>Данное письмо не требует ответа.<p>`,
    };
    await sendEmail(mail);

    res.status(201).json({ message: 'Рассылка успешно выполнена!' });
  } catch (e) {
    res.status(500).json(e);
  }
};

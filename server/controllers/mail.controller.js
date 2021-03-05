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

    const template = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
        <title>S.TAR.MAIL</title>
        <style type="text/css">
        </style>
      </head>
      <body style="margin:10; padding:10;">
        <table cellspacing="0" cellpadding="0" style="background:#224955;width:760px;font-family:arial;color:#fff;border-spacing:0;border-collapse:collapse;border:1px solid #ccc;margin-left: auto; margin-right:auto;">
          <tr>
            <td>
              <table cellspacing="0" cellpadding="0" style="background:#224955;width:100%;border-spacing: 0;border-collapse:collapse; align="center"">
                <tr>
                  <td align="center" style="padding: 20px 50px 20px 50px;">
                    <img src="https://s-tar-mail.herokuapp.com/app_logo_0.5.png" alt="app_logo" width="145" height="30" />
                  </td>
                </tr>
              </table>
              <hr style="border-top: none;margin: 0;border-color: #FFAD00">
              <table cellspacing="0" cellpadding="0" style="background:#224955;width:100%;border-spacing: 0;border-collapse:collapse;">
                <tr>
                  <td style="padding:50px 55px 50px 50px;">
                    ${req.body.textMail}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

    const mail = {
      from: `S.TAR.MAIL <${keys.EMAIL}>`,
      to: req.body.emailsArray,
      subject: req.body.subject,
      html: template,
    };
    await sendEmail(mail);

    res.status(201).json({ message: 'Рассылка успешно выполнена!' });
  } catch (e) {
    res.status(500).json(e);
  }
};

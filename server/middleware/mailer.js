const nodemailer = require('nodemailer');
const keys = require('../keys');

module.exports.sendEmail = async (message) => {
  const transporter = nodemailer.createTransport(
    {
      pool: true,
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: keys.EMAIL,
        refreshToken: keys.EMAIL_REFRESH_TOKEN,
        clientId: keys.EMAIL_CLIENT_ID,
        clientSecret: keys.EMAIL_CLIENT_SECRET,
      },
    },
  );
  try {
    await transporter.sendMail(message);
  } catch (e) {
    console.log(e);
  }
};

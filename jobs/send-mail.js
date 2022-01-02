const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_LOGIN,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmail = (subject, text) => {
  transporter.sendMail({
    from: '"GPU Alerts" <foo@example.com>',
    to: process.env.ALERT_LIST,
    subject,
    text,
  });
}

module.exports = sendEmail;

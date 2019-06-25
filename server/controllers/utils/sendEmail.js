const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const sendEmail = (reciver, message) =>
  transporter.sendMail({
    subject: " Social Streets Application",
    from: `"Social Streets" ${process.env.NODEMAILER_EMAIL}`,
    to: reciver,
    html: message // in html
  });

module.exports = sendEmail;

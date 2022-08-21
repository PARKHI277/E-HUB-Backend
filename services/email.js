const nodemailer = require("nodemailer");
const emailer = function emailer(to, text) {
  //function to send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testapi277@gmail.com",
      pass: process.env.pass,
    },
  });

  const mailOptions = {
    from: process.env.email,
    to: to,
    subject: "OTP for email verification",
    text: "Your OTP is " + text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("OTP sent: " + info.response);
    }
  });
};

module.exports = emailer;

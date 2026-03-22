const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Password Reset OTP",
    html: `<h2>Your OTP Code</h2><p>Your OTP is: <strong>${otp}</strong></p><p>Valid for 10 minutes.</p>`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };

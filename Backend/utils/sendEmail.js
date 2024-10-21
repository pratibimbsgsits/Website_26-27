const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: "eklavyasinghparihar7875@gmail.com",
      pass: "ybhbhroqrjesdelc", 
    }
  });

const sendEmail = async (email, name, qrCodeFilePath) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../templates/emailTemplate.html"
    );
    const emailTemplate = fs.readFileSync(templatePath, "utf-8");

    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Your Event Ticket",
      html: emailTemplate.replace("{{name}}", name),
      attachments: [
        {
          filename: "qr_code.png",
          path: qrCodeFilePath,
          cid: "qrCodeImage",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;

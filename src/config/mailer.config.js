import config from "./config.js";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "contactmatiasmorales@gmail.com",
    pass: config.passwordGoogle,
  },
});

export const sendDeletionEmail = async (email, userName) => {
  const mailOptions = {
    from: "contactmatiasmorales@gmail.com",
    to: email,
    subject: "Account Deletion Due to Inactivity",
    text: `Dear ${userName},\n\nYour account has been deleted due to inactivity for the past 30 minutes.\n\nBest regards,\nYour Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


export const sendDeletionProductEmail = async (email, userName, pTitle, pCode) => {
  const mailOptions = {
    from: "contactmatiasmorales@gmail.com",
    to: email,
    subject: "A product of yours was eliminated",
    text: `Dear ${userName},\n\nThe product was deleted: ${pTitle}, with code: ${pCode}.\n\nBest regards,\nYour Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


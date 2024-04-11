import config from "./config.js";
import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'contactmatiasmorales@gmail.com',
      pass: config.passwordGoogle
    }
  });
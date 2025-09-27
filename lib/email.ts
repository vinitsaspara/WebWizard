import nodemailer from "nodemailer";

export const sendCredentialsEmail = async (to: string, userId: string, password: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Student Portal" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Account Credentials",
    text: `Hello, your account has been created.\n\nUser ID: ${userId}\nPassword: ${password}\n\nPlease login and change your password.`,
  });
};

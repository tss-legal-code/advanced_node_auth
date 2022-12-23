const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      // service: 'gmail',
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: 'tss.nodemailer@gmail.com', //process.env.SMTP_USER,
      to,
      subject: 'Activation of your account at TSS ' + process.env.API_URL,
      text: "",
      html: `
      <div>
        <h1>To activate your account at TSS click an activation link below:</h1>
        <a href="${link}">${link}</a>
      </div>
      `
    });
  }
}

module.exports = new MailService();
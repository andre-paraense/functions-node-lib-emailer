const nodemailer = require('nodemailer')
const functions = require('firebase-functions')

const sendEmail = async (email, subject, html) => {
  try {
    const mailTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: functions.config().gmail.login,
        pass: functions.config().gmail.password,
      },
    })

    const mailOptions = {
      to: email,
      subject,
      html,
    }

    await mailTransport.sendMail(mailOptions)
  } catch (err) {
    console.error('Error sending email', err)
    throw err
  }
}

module.exports = {
  sendEmail,
}

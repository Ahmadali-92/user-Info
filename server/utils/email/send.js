const {Resend} = require('resend');
const dotenv = require('dotenv');
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async ({to, from, subject, html}) => {
  const msg = {to, from, subject, html};
  try {
    await resend.emails.send(msg);
  } catch (error) {
    console.log(error);
  }
};

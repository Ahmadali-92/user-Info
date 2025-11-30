const sendEmail = require('../send');

module.exports = async ({user, resetUrl}) => {
  const {email, fullName} = user;

  const to = email;
  const from = 'user-info@resend.dev';
  const subject = 'Reset your password';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; line-height: 1.6; color: #333;">
      <p style="font-size: 16px;">Hi ${fullName},</p>
      
      <p style="font-size: 15px;">
        We received a request to reset your password. Click the button below to choose a new one:
      </p>

      <div style="margin: 30px 0; text-align: center;">
        <a href="${resetUrl}" 
          style="background-color: #1a73e8;
                 color: #fff;
                 padding: 14px 28px;
                 text-decoration: none;
                 border-radius: 6px;
                 display: inline-block;
                 font-weight: bold;
                 font-size: 16px;">
          Reset Password
        </a>
      </div>

      <p style="font-size: 14px; color: #555;">
        If the button above doesn’t work, copy and paste the following link into your browser:
      </p>
      <p style="word-break: break-all; font-size: 13px; color: #1a73e8;">
        <a href="${resetUrl}" style="color: #1a73e8;">${resetUrl}</a>
      </p>

      <p style="font-size: 14px; color: #555;">
        If you didn’t request a password reset, you can safely ignore this email. 
        Your account will remain secure.
      </p>

      <p style="margin-top: 30px; font-size: 14px;">
        Thanks,<br/>
      </p>
    </div>
  `;

  await sendEmail({to, from, subject, html});
};

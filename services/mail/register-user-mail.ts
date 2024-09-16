import sgMail from '@sendgrid/mail';

interface SendMailParams {
  token: string;
  receiverMail: string;
}

const {
  SENDGRID_API_KEY,
  SENDER_MAIL_ACC,
  APP_BASE_URL_DEV,
  APP_BASE_URL_PROD,
  NODE_ENV,
} = process.env;

export const handleRegisterUserMail = ({
  token,
  receiverMail,
}: SendMailParams) => {
  sgMail.setApiKey(SENDGRID_API_KEY ?? '');
  const registerPath = `${
    NODE_ENV === 'production' ? APP_BASE_URL_PROD : APP_BASE_URL_DEV
  }/auth/register?token=${token}`;

  const emailData = {
    to: receiverMail,
    from: SENDER_MAIL_ACC ?? '',
    subject: `Invitation to Uploader by Pablo Avilés`,
    html: `
        <p>Hello,</p>
        <p>You've invited to create an account on Uploader. Please click the button below to confirm your email address and finish the registration process:</p>
        <a href="${registerPath}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;" target="_blank" rel="noopener noreferrer">Register Account</a>
        <p>This invitation will expire in 1 hour. If you didn't expect this invite, please ignore this email or let us know at <a href="mailto:info@pabloaviles.es">info@pabloaviles.es</a>.</p>
        `,
    text: `Hello,\n\nYou've invited to create an account on Uploader. Please copy and paste the following link into your browser to continue the registration process: ${registerPath}\n\nThis link will expire in 1 hour. If you did not request an account, please ignore this email or let us know at info@pabloaviles.es.`,
  };
  return sgMail.send(emailData);
};

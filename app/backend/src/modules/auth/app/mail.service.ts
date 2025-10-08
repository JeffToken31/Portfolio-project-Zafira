// src/modules/auth/app/mail.service.ts
import { Injectable, Logger } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor() {
    const key = process.env.SENDGRID_API_KEY;
    if (!key) {
      this.logger.warn('SENDGRID_API_KEY not set — emails will fail');
    } else {
      sgMail.setApiKey(key);
    }
  }

  async sendVerificationEmail(email: string, token: string) {
    const frontend = process.env.ALLOWED_ORIGIN;
    const verificationUrl = `${frontend}/auth/verify-email?token=${token}`;

    const msg = {
      to: email,
      from: process.env.EMAIL_FROM ?? `no-reply@zafira.app`,
      subject: 'Vérifiez votre adresse e-mail',
      html: `
        <p>Merci de vous être inscrit. Cliquez sur le lien pour vérifier votre adresse e-mail :</p>
        <a href="${verificationUrl}">Vérifier mon e-mail</a>
      `,
    };

    try {
      await sgMail.send(msg);
      this.logger.log(`Verification mail sent to ${email}`);
    } catch (err) {
      this.logger.error('SendGrid error', err);
      throw err;
    }
  }
}

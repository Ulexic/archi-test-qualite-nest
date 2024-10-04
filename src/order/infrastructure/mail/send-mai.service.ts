import { SendMailServiceInterface } from 'src/order/domain/port/mail/send-mail.service.interface';

export class SendMailService implements SendMailServiceInterface {
  async sendMail(to: string, text: string) {
    // send mail
    console.log('Mail sent to ' + to + ' with text: ' + text);
  }
}

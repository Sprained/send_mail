import MailRepository from "../../repositories/MailRepository"

class MailConfigService {
  async change_mail_sender(type: 'NODEMAILER' | 'AWS') {
    await MailRepository.change_mail_sender(type)

    return
  }
}

export default new MailConfigService()
import { IUpdateInfosMail, INodemailerInfosUp, IAWSInfosUp } from '../../interfaces/MailInterface'
import NodemailerRepository from '../../repositories/NodemailerRepository'
import MailRepository from "../../repositories/MailRepository"
import AwsRepository from '../../repositories/AwsRepository'

class MailConfigService {
  async change_mail_sender(type) {
    await MailRepository.change_mail_sender(type)

    return
  }

  async updateInfosMail(body: IUpdateInfosMail): Promise<void> {
    const type = await MailRepository.get_type_mail()

    if(type === 'NODEMAILER') {
      const response: INodemailerInfosUp = body

      await NodemailerRepository.updateInfos(response)
    }

    if(type === 'AWS') {
      const response: IAWSInfosUp = body

      await AwsRepository.updateInfos(response)
    }
  }
}

export default new MailConfigService()
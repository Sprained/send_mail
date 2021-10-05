import { PrismaClient, TypeMail } from '@prisma/client'

const prisma = new PrismaClient()

class MailRepository {
  async change_mail_sender(type: 'NODEMAILER' | 'AWS') {
    await prisma.configMail.updateMany({
      data: {
        type: {
          set: type === 'NODEMAILER' ? TypeMail.NODEMAILER : TypeMail.AWS
        }
      }
    })

    return
  }
}

export default new MailRepository()
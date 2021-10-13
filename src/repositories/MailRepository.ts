import { PrismaClient, TypeMail } from '@prisma/client'

const prisma = new PrismaClient()

class MailRepository {
  async change_mail_sender(type): Promise<void> {
    const data = type
    await prisma.configMail.updateMany({
      data
    })
  }

  async get_type_mail(): Promise<string> {
    const mail = await prisma.configMail.findFirst({
      select: {
        type: true
      }
    })

    return mail.type
  }
}

export default new MailRepository()
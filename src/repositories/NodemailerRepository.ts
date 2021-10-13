import { PrismaClient } from '@prisma/client'

import { INodemailerInfosUp } from '../interfaces/MailInterface'

const prisma = new PrismaClient()

class NodemailerRepository {
  async updateInfos(body: INodemailerInfosUp): Promise<void> {
    const data = body
    await prisma.credentialsNodemailer.updateMany({
      data
    })
  }
}

export default new NodemailerRepository()
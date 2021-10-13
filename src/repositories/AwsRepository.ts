import { PrismaClient } from '@prisma/client'

import { IAWSInfosUp } from '../interfaces/MailInterface'

const prisma = new PrismaClient()

class AwsRepository {
  async updateInfos(body: IAWSInfosUp): Promise<void> {
    const data = body
    await prisma.credentialsAws.updateMany({
      data
    })
  }
}

export default new AwsRepository()
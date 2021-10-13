/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from '@prisma/client'

import AwsRepository from '../../../src/repositories/AwsRepository'
import { IAWSInfosUp } from '../../../src/interfaces/MailInterface'

const prisma = new PrismaClient()

describe('AWS repository', () => {

  it('update infos', async () => {
    const awsInfos: IAWSInfosUp = {
      awsAccessKeyId: 'teste',
      awsSecretAccessKey: 'teste'
    }

    await AwsRepository.updateInfos(awsInfos)

    const mail = await prisma.credentialsAws.findFirst()

    expect(mail.awsAccessKeyId).toBe('teste')
    expect(mail.awsSecretAccessKey).toBe('teste')
  })
})
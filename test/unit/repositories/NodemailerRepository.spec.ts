/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from '@prisma/client'

import NodemailerRepository from '../../../src/repositories/NodemailerRepository'
import { INodemailerInfosUp } from '../../../src/interfaces/MailInterface'

const prisma = new PrismaClient()

describe('NODEMAILER repository', () => {
  
  it('update infos', async () => {
    const nodemailerInfos: INodemailerInfosUp = {
      host: 'teste',
      port: 999,
      secure: false,
      user: 'teste',
      pass: 'teste'
    }

    await NodemailerRepository.updateInfos(nodemailerInfos)

    const mail = await prisma.credentialsNodemailer.findFirst()

    expect(mail.host).toBe(nodemailerInfos.host)
    expect(mail.port).toBe(nodemailerInfos.port)
    expect(mail.secure).toBe(nodemailerInfos.secure)
    expect(mail.user).toBe(nodemailerInfos.user)
    expect(mail.pass).toBe(nodemailerInfos.pass)
  })
})
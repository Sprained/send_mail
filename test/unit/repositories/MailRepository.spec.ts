/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from '@prisma/client'

import MailRepository from '../../../src/repositories/MailRepository'

const prisma = new PrismaClient()

describe('Mail repository', () => {

  it('update type mais config', async () => {
    let mail = await prisma.configMail.findFirst()

    expect(mail.type).toBe('NODEMAILER')

    await MailRepository.change_mail_sender({ type: 'AWS' })

    mail = await prisma.configMail.findFirst()

    expect(mail.type).toBe('AWS')
  })
})
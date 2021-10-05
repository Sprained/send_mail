/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from '@prisma/client'

import MailConfigService from '../../../../src/services/Mail/MailConfigService'

const prisma = new PrismaClient()

describe('Mail Config Service', () => {

  it('update type mais config', async () => {
    let mail = await prisma.configMail.findFirst()

    expect(mail.type).toBe('NODEMAILER')

    await MailConfigService.change_mail_sender('AWS')

    mail = await prisma.configMail.findFirst()

    expect(mail.type).toBe('AWS')
  })
})
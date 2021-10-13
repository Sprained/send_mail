/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from '@prisma/client'

import MailConfigService from '../../../../src/services/Mail/MailConfigService'
import { IAWSInfosUp, INodemailerInfosUp } from '../../../../src/interfaces/MailInterface'

const prisma = new PrismaClient()

describe('Mail Config Service', () => {

  it('update type mais config', async () => {
    let mail = await prisma.configMail.findFirst()

    expect(mail.type).toBe('NODEMAILER')

    await MailConfigService.change_mail_sender({ type: 'AWS' })

    mail = await prisma.configMail.findFirst()

    expect(mail.type).toBe('AWS')
  })

  it('update infos mail', async () => {
    let body: IAWSInfosUp | INodemailerInfosUp = {
      awsAccessKeyId: 'teste',
      awsSecretAccessKey: 'teste'
    }

    await MailConfigService.updateInfosMail(body)

    let mail: any = await prisma.credentialsAws.findFirst()

    expect(mail.awsAccessKeyId).toBe(body.awsSecretAccessKey)
    expect(mail.awsSecretAccessKey).toBe(body.awsSecretAccessKey)

    // Fields Nodemailer
    body = {
      host: 'teste',
      port: 999,
      secure: false,
      user: 'teste',
      pass: 'teste'
    }

    await prisma.configMail.updateMany({
      data: {
        type: 'NODEMAILER'
      }
    })

    await MailConfigService.updateInfosMail(body)

    mail = await prisma.credentialsNodemailer.findFirst()

    expect(mail.host).toBe(body.host)
    expect(mail.port).toBe(body.port)
    expect(mail.secure).toBe(body.secure)
    expect(mail.user).toBe(body.user)
    expect(mail.pass).toBe(body.pass)
  })
})
/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from '@prisma/client'
import request from 'supertest'

import { IUpdateInfosMail } from '../../../src/interfaces/MailInterface'
import App from '../../../src/app'

const prisma = new PrismaClient()

describe('update infos nodemailer and aws', () => {
  let token: string

  beforeAll(async () => {
    const body = {
      email: process.env.ADMIN_EMAIL as string,
      password: process.env.ADMIN_PASS as string
    }
  
    const response = await request(App).post('/v1/login').send(body);
    token = response.body.token
  })

  it('update infos mail', async () => {
    //Config AWS
    let body: IUpdateInfosMail = {
      awsAccessKeyId: 'teste',
      awsSecretAccessKey: 'teste'
    }

    await prisma.configMail.updateMany({
      data: {
        type: 'AWS'
      }
    })

    let response = await request(App).patch('/v1/mail/infos').auth(token, { type: 'bearer' }).send(body)

    expect(response.status).toBe(204)

    let mail: any = await prisma.credentialsAws.findFirst()

    expect(mail.awsAccessKeyId).toBe(body.awsSecretAccessKey)
    expect(mail.awsSecretAccessKey).toBe(body.awsSecretAccessKey)

    //Config Nodemailer
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

    response = await request(App).patch('/v1/mail/infos').auth(token, { type: 'bearer' }).send(body)

    mail = await prisma.credentialsNodemailer.findFirst()

    expect(mail.host).toBe(body.host)
    expect(mail.port).toBe(body.port)
    expect(mail.secure).toBe(body.secure)
    expect(mail.user).toBe(body.user)
    expect(mail.pass).toBe(body.pass)
  })
})
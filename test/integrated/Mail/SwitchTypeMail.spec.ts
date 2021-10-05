/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from '@prisma/client'
import request from 'supertest'

import App from '../../../src/app'

const prisma = new PrismaClient()

describe('switch type mail', () => {
  let token: string

  beforeAll(async () => {
    const body = {
      email: process.env.ADMIN_EMAIL as string,
      password: process.env.ADMIN_PASS as string
    }
  
    const response = await request(App).post('/v1/login').send(body);
    token = response.body.token
  })

  it('switch to aws', async () => {
    const body = {
      type: 'AWS'
    }

    const response = await request(App).put('/v1/mail/switch').auth(token, { type: 'bearer' }).send(body)

    expect(response.status).toBe(204)

    const mail = await prisma.configMail.findFirst()

    expect(mail.type).toBe('AWS')
  })

  it('error type required', async () => {
    const body = {}

    const response = await request(App).put('/v1/mail/switch').auth(token, { type: 'bearer' }).send(body)

    const responseError = {
      msg: 'Type is required',
      param: 'type',
      location: 'body'
    }

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0]).toStrictEqual(responseError)
  })

  it('error enum', async () => {
    const body = {
      type: 'teset'
    }

    const response = await request(App).put('/v1/mail/switch').auth(token, { type: 'bearer' }).send(body)

    const responseError = {
      msg: 'Type must be NODEMAILER or AWS',
      param: 'type',
      location: 'body',
      value: 'teset'
    }

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0]).toStrictEqual(responseError)
  })
})
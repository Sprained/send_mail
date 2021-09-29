/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from '@prisma/client'
import request from 'supertest'

import App from '../../../src/app'

const prisma = new PrismaClient()

describe('create user', () => {
  let token: string

  beforeAll(async () => {
    const body = {
      email: process.env.ADMIN_EMAIL as string,
      password: process.env.ADMIN_PASS as string
    }
  
    const response = await request(App).post('/v1/login').send(body);
    token = response.body.token
  })
  
  it('create user success', async () => {
    const random = Math.random().toString(32).slice(-8)
    const body = {
      email: `${random}@email.com`,
      phone: '12345678901',
      name: 'teste'
    }

    const response = await request(App).post('/v1/user').auth(token, { type: 'bearer' }).send(body)

    expect(response.status).toBe(201)
  })

  it('create user mising email', async () => {
    const body = {
      phone: '12345678901',
      name: 'teste'
    }

    const response = await request(App).post('/v1/user').auth(token, { type: 'bearer' }).send(body)

    const responseError = {
      msg: "Email is required",
      param: "email",
      location: "body"
    }

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0]).toStrictEqual(responseError)
  })

  it('create user email invalid format', async () => {
    const body = {
      email: 'testeemail.com',
      phone: '12345678901',
      name: 'teste'
    }

    const response = await request(App).post('/v1/user').auth(token, { type: 'bearer' }).send(body)

    const responseError = {
      msg: "Invalid email format",
      param: "email",
      location: "body",
      value: "testeemail.com"
    }

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0]).toStrictEqual(responseError)
  })

  it('create user missing phone', async () => {
    const random = Math.random().toString(32).slice(-8)
    const body = {
      email: `${random}@email.com`,
      name: 'teste'
    }

    const response = await request(App).post('/v1/user').auth(token, { type: 'bearer' }).send(body)

    const responseError = {
      msg: "Phone is required",
      param: "phone",
      location: "body"
    }

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0]).toStrictEqual(responseError)
  })

  it('create user missing name', async () => {
    const random = Math.random().toString(32).slice(-8)
    const body = {
      email: `${random}@email.com`,
      phone: '123456789011',
    }

    const response = await request(App).post('/v1/user').auth(token, { type: 'bearer' }).send(body)

    const responseError = {
      msg: "Name is required",
      param: "name",
      location: "body"
    }

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0]).toStrictEqual(responseError)
  })

  it('user already exists', async () => {
    const body = {
      email: process.env.ADMIN_EMAIL,
      phone: '12345678901',
      name: 'teste'
    }

    const response = await request(App).post('/v1/user').auth(token, { type: 'bearer' }).send(body)

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('User already exists')
  })

  it('phone already in use', async () => {
    const admin = await prisma.user.findFirst({
      where: {
        email: process.env.ADMIN_EMAIL
      }
    })

    admin.phone = '12345678901'

    const random = Math.random().toString(32).slice(-8)
    const body = {
      email: `${random}@email.com`,
      phone: '12345678901',
      name: 'teste'
    }

    const response = await request(App).post('/v1/user').auth(token, { type: 'bearer' }).send(body)

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Phone is already in use')
  })
})
/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from '@prisma/client'
import request from 'supertest'
import jwt from 'jsonwebtoken'

import App from '../../../src/app'

const prisma = new PrismaClient()

describe('admin middleware', () => {
  let token: string

  beforeAll(async () => {
    const body = {
      email: process.env.ADMIN_EMAIL as string,
      password: process.env.ADMIN_PASS as string
    }
  
    const response = await request(App).post('/v1/login').send(body);
    token = response.body.token
  })

  it('token not provided', async () => {
    const response = await request(App).post('/v1/user')

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Token not provided')
  })

  it('token not invalid', async () => {
    const response = await request(App).post('/v1/user').auth(`${token}pp`, { type: 'bearer' })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Token invalid')
  })
})
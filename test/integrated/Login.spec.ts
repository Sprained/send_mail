/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest'

import App from '../../src/app'

describe('Login', () => {
  
  it('login success', async () => {
    const body = {
      email: process.env.ADMIN_EMAIL as string,
      password: process.env.ADMIN_PASS as string
    }

    const response = await request(App).post('/v1/login').send(body);

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('login wrong email', async () => {
    const body = {
      email:  'teset@teste.com',
      password: process.env.ADMIN_PASS as string
    }

    const response = await request(App).post('/v1/login').send(body);

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Incorrect user or password')
  })

  it('login wrong password', async () => {
    const body = {
      email:  process.env.ADMIN_EMAIL as string,
      password: '123'
    }

    const response = await request(App).post('/v1/login').send(body);

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Incorrect user or password')
  })

  it('login missing password', async () => {
    const body = {
      email:  process.env.ADMIN_EMAIL as string
    }

    const response = await request(App).post('/v1/login').send(body);

    const responseError = {
      msg: "Password is required",
      param: "password",
      location: "body"
    }

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0]).toStrictEqual(responseError)
  })

  it('login missing email', async () => {
    const body = {
      password: process.env.ADMIN_PASS as string
    }

    const response = await request(App).post('/v1/login').send(body);

    const responseError = {
      msg: "Email is required",
      param: "email",
      location: "body"
    }

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0]).toStrictEqual(responseError)
  })

  it('email invalid format', async () => {
    const body = {
      email:  'tesetteste.com',
      password: process.env.ADMIN_PASS as string
    }

    const response = await request(App).post('/v1/login').send(body);

    const responseError = {
      msg: "Invalid email format",
      param: "email",
      location: "body",
      value: "tesetteste.com"
    }

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0]).toStrictEqual(responseError)
  })
})
/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { ILoginCreate } from '../../../src/interfaces/LoginInterface'
import LoginService from '../../../src/services/LoginService'

describe('Login Service', () => {

  it('generate token sucess', async () => {
    const credentials: ILoginCreate = {
      email: process.env.ADMIN_EMAIL as string,
      password: process.env.ADMIN_PASS as string
    }

    const token = await LoginService.create(credentials)

    expect(typeof token).toBe('string')
  })

  it('user not found', async () => {
    const credentials: ILoginCreate = {
      email: 'email@email.com',
      password: process.env.ADMIN_PASS as string
    }

    try {
      await LoginService.create(credentials)
    } catch (error: any) {
      expect(error.statusCode).toBe(401)
      expect(error.message).toBe('Incorrect user or password')
    }
  })

  it('incorrect password', async () => {
    const credentials: ILoginCreate = {
      email: process.env.ADMIN_EMAIL as string,
      password: '1234'
    }

    try {
      await LoginService.create(credentials)
    } catch (error: any) {
      expect(error.statusCode).toBe(401)
      expect(error.message).toBe('Incorrect user or password')
    }
  })
})
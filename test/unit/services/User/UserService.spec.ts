/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from '@prisma/client'

import { ICreateUSer } from '../../../../src/interfaces/UserInterface'
import UserService from '../../../../src/services/User/UserService'

const prisma = new PrismaClient()

describe('User Service', () => {

  it('create new user', async () => {
    const admin = await prisma.user.findFirst({
      where: {
        email: 'admin@email.com'
      }
    })

    const body: ICreateUSer = {
      name: 'string',
      email: 'string@email.com',
      phone: '12345678901',
      adminId: admin.id,
      password: '123'
    }

    const response = await UserService.create(body)

    expect(response).toBe(undefined)
  })

  it('create new user same email', async () => {
    const admin = await prisma.user.findFirst({
      where: {
        email: process.env.ADMIN_EMAIL
      }
    })

    const body: ICreateUSer = {
      name: 'string',
      email: admin.email,
      phone: '12345678901',
      adminId: admin.id,
      password: '123'
    }

    try {
      await UserService.create(body)
    } catch (error) {
      expect(error.statusCode).toBe(409)
      expect(error.message).toBe('User already exists')
    }
  })

  it('create new user same phone', async () => {
    const admin = await prisma.user.findFirst({
      where: {
        email: process.env.ADMIN_EMAIL
      }
    })
    admin.phone = '12345678901'

    const body: ICreateUSer = {
      name: 'string',
      email: 'teste@email.com',
      phone: admin.phone,
      adminId: admin.id,
      password: '123'
    }

    try {
      await UserService.create(body)
    } catch (error) {
      expect(error.statusCode).toBe(409)
      expect(error.message).toBe('Phone is already in use')
    }
  })
})
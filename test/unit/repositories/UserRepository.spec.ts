/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from '@prisma/client'

import UserRepository from '../../../src/repositories/UserRepository'

const prisma = new PrismaClient()

describe('User repository', () => {

  it('select user by email', async() => {
    const user = await prisma.user.findFirst()
    
    const response = await UserRepository.get_user_for_login((user?.email as string))

    expect(response).toStrictEqual({
      id: user?.id,
      email: user?.email,
      password: user?.password
    })
  })

  it('return null when user does not exist', async () => {
    const response = await UserRepository.get_user_for_login('teste@email.com')
    
    expect(response).toBeNull()
  })

  it('select user by phone', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'teste@email.com',
        password: 'teste',
        phone: '12345678901'
      }
    })

    const response = await UserRepository.get_user_by_phone(user.phone)

    expect(response).toStrictEqual(user)
  })
})
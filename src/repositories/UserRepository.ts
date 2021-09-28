import { PrismaClient, User } from '@prisma/client'

import { ILoginGet } from '../interfaces/LoginInterface'
import { ICreateUSer } from '../interfaces/UserInterface'

const prisma = new PrismaClient()

class UserRepository {
  async get_user_for_login(email: string): Promise<ILoginGet | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        email: true,
        password: true
      }
    })

    return user
  }

  async get_user_by_phone(phone: number): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        phone: phone
      }
    })

    return user
  }

  async create({ email, name, phone, adminId, password }: ICreateUSer) {
    await prisma.user.create({
      data: {
        email,
        name,
        phone,
        password,
        userPassword: {
          create: {
            password: password
          }
        },
        userLog: {
          create: {
            adminId,
            body: {
              email, name, phone
            }
          }
        }
      }
    })

    return
  }
}

export default new UserRepository()
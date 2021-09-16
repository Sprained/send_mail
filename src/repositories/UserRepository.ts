import { PrismaClient } from '@prisma/client'

import { ILoginGet } from '../interfaces/LoginInterface'

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
}

export default new UserRepository()
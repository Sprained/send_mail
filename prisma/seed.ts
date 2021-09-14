import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  if(process.env.ADMIN_EMAIL) {
    await prisma.user.create({
      data: {
        email: process.env.ADMIN_EMAIL,
        name: 'admin',
        password: await bcrypt.hash((process.env.ADMIN_PASS as string), 8)
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
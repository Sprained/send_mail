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

  await prisma.configMail.create({
    data: {
      type: 'NODEMAILER'
    }
  })
  
  await prisma.credentialsNodemailer.create({
    data: {
      host: '',
      pass: '',
      port: 587,
      user: ''
    }
  })

  await prisma.credentialsAws.create({
    data: {
      awsAccessKeyId: '',
      awsSecretAccessKey: ''
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
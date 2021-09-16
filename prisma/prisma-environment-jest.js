const NodeEnvironment = require('jest-environment-node')
const { execSync } = require('child_process')
const { resolve } = require('path')
const mysql = require('mysql2')

require('dotenv').config({
  path: resolve(__dirname, '..', '.env.test')
})

const con = mysql.createConnection(process.env.DATABASE_URL)
const prismaCli = "./node_modules/.bin/prisma"
const tsNode = "./node_modules/.bin/ts-node"

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
  }
  
  setup() {
    process.env.DATABASE_URL = `${process.env.DATABASE_URL}/supertest`
    this.global.process.env.DATABASE_URL = `${process.env.DATABASE_URL}/supertest`
    this.global.process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL
    this.global.process.env.ADMIN_PASS = process.env.ADMIN_PASS

    con.query('CREATE DATABASE IF NOT EXISTS supertest')

    execSync(`${prismaCli} migrate dev`)
    execSync(`${tsNode} prisma/seed.ts`)
  }

  teardown() {
    con.query('DROP DATABASE supertest')
  }
}

module.exports = CustomEnvironment
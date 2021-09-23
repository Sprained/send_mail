const NodeEnvironment = require('jest-environment-node')
const { execSync } = require('child_process')
const { v4: uuid } = require('uuid')
const { resolve } = require('path')
const { Client } = require('pg')

require('dotenv').config({
  path: resolve(__dirname, '..', '.env.test')
})

const prismaCli = "./node_modules/.bin/prisma"
const tsNode = "./node_modules/.bin/ts-node"

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
    
    this.uuid = `code_schema_${uuid()}`
    this.url = `${process.env.DATABASE_URL}${this.uuid}`
  }
  
  setup() {
    process.env.DATABASE_URL = this.url
    this.global.process.env.DATABASE_URL = this.url
    this.global.process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL
    this.global.process.env.ADMIN_PASS = process.env.ADMIN_PASS

    execSync(`${prismaCli} migrate dev`)
    execSync(`${tsNode} prisma/seed.ts`)
  }

  async teardown() {
    const client = new Client({
      connectionString: this.url
    })

    await client.connect()
    await client.query(`DROP SCHEMA IF EXISTS "${this.uuid}" CASCADE`)
    await client.end()
  }
}

module.exports = CustomEnvironment
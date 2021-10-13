const NodeEnvironment = require('jest-environment-node')
const { exec } = require('child_process')
const { v4: uuid } = require('uuid')
const { resolve } = require('path')
const { Client } = require('pg')

const util = require('util')

require('dotenv').config({
  path: resolve(__dirname, '..', '.env.test')
})

const prismaCli = "./node_modules/.bin/prisma"
const tsNode = "./node_modules/.bin/ts-node"
const execSync = util.promisify(exec)

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
    
    this.uuid = `code_schema_${uuid()}`
    this.url = `${process.env.DATABASE_URL}${this.uuid}`
  }
  
  async setup() {
    process.env.DATABASE_URL = this.url
    this.global.process.env.DATABASE_URL = this.url
    this.global.process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL
    this.global.process.env.ADMIN_PASS = process.env.ADMIN_PASS
    this.global.process.env.TOKEN_SECRET = process.env.TOKEN_SECRET
    this.global.process.env.EXPIRE_TOKEN = process.env.EXPIRE_TOKEN
    this.global.process.env.port = process.env.port
    this.global.process.env.REDIS_HOST = process.env.REDIS_HOST

    await execSync(`${prismaCli} migrate deploy --preview-feature`)
    await execSync(`${tsNode} prisma/seed.ts`)

    return super.setup()
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
import redis from 'redis'

import { IJWTRegister } from '../interfaces/RedisInterface'

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT as string)
})

class Redis {
  async register_jwt({ token, expiresIn, id }: IJWTRegister) {
    client.set(token, JSON.stringify(id))
    client.expire(token, expiresIn)
  }
}

export default new Redis()
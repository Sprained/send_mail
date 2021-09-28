import { promisify } from 'util'
import redis from 'redis'

import { IJWTRegister, IJWTGet } from '../interfaces/RedisInterface'

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT as string)
})

class Redis {
  async register_jwt({ token, expiresIn, id }: IJWTRegister) {
    client.set(token, JSON.stringify(id))
    client.expire(token, expiresIn)
  }

  async get_infos_by_token(token: string): Promise<IJWTGet> {
    let values: IJWTGet = {}

    await new Promise(resolve => {
      client.get(token, function(err, reply) {
        values = JSON.parse(reply as string)
        resolve(reply)
      })
    })

    return values
  }
}

export default new Redis()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import LoginRepository from '../repositories/UserRepository'
import { ILoginCreate } from '../interfaces/LoginInterface'
import { IJWTRegister } from '../interfaces/RedisInterface'
import { Handler } from '../errors/Handler'
import Redis from '../utils/Redis'

class LoginService {
  async create({ email, password }: ILoginCreate): Promise<string> {
    const user = await LoginRepository.get_user_for_login(email)

    if(!user) {
      throw new Handler(401, 'Incorrect user or password')
    }

    if(!(await bcrypt.compare(password, user.password))) {
      throw new Handler(401, 'Incorrect user or password')
    }

    const expiresIn = parseInt(process.env.EXPIRE_TOKEN as string)
    const token = jwt.sign({}, (process.env.TOKEN_SECRET as string), {
      expiresIn: expiresIn
    })

    const redisBody: IJWTRegister = {
      token,
      expiresIn,
      id: {
        admin: {
          id: user.id
        }
      }
    }

    Redis.register_jwt(redisBody)

    return token
  }
}

export default new LoginService()
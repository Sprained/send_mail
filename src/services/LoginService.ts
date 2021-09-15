import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import LoginRepository from '../repositories/UserRepository'
import { ILoginCreate } from '../interfaces/LoginInterface'
import { Handler } from '../errors/Handler'

class LoginService {
  async create({ email, password }: ILoginCreate): Promise<string> {
    const user = await LoginRepository.get_user_for_login(email)

    if(!user) {
      throw new Handler(401, 'Incorrect user or password')
    }

    if(!(await bcrypt.compare(password, user.password))) {
      throw new Handler(401, 'Incorrect user or password')
    }

    const token = jwt.sign({ id: user.id }, 'teste')

    return token
  }
}

export default new LoginService()
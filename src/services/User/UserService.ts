import bcrypt from 'bcryptjs'

import UserRepository from '../../repositories/UserRepository'
import { ICreateUSer } from '../../interfaces/UserInterface'
import { Handler } from '../../errors/Handler'

class UserService {
  async create(body: ICreateUSer): Promise<void> {
    let user = await UserRepository.get_user_for_login(body.email)
    if(user) {
      throw new Handler(409, 'User already exists')
    }

    user = await UserRepository.get_user_by_phone(body.phone)
    if(user) {
      throw new Handler(409, 'Phone is already in use')
    }

    let password = Math.random().toString(36).slice(-8)
    password = await bcrypt.hash(password, 8)

    body.password = password

    await UserRepository.create(body)

    return
  }
}

export default new UserService()
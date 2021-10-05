import { Response, Request } from 'express'

import UserService from '../../services/User/UserService'
import ValidationErrors from '../../errors/ValidationErrors'

class UserController {
  async create(req: Request, res: Response) {
    ValidationErrors.erro422(req, res)
    
    try {
      req.body.adminId = req.user.id
      await UserService.create(req.body)

      return res.status(201).send()
    } catch (error) {
      return res.status(error.statusCode).send({ 'error': error.message })
    }
  }
}

export default new UserController()
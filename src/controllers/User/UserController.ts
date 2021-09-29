import { validationResult } from 'express-validator'
import { Response, Request } from 'express'

import UserService from '../../services/User/UserService'

class UserController {
  async create(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    
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
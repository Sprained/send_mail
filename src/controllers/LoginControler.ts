import { Response, Request } from 'express'

import LoginService from '../services/LoginService'
import ValidationErrors from '../errors/ValidationErrors';

class LoginController {
  async create(req: Request, res: Response) {
    ValidationErrors.erro422(req, res)

    try {
      const login: string = await LoginService.create(req.body)
  
      return res.status(200).send({ token: login })
    } catch (error: any) {
      return res.status(error.statusCode).send({ 'error': error.message })
    }
  }
}

export default new LoginController()
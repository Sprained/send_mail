import { validationResult } from 'express-validator';
import { Response, Request } from 'express'

import LoginService from '../services/LoginService'

class LoginController {
  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const login: string = await LoginService.create(req.body)
  
      return res.status(200).send({ token: login })
    } catch (error: any) {
      return res.status(error.statusCode).send({ 'error': error.message })
    }
  }
}

export default new LoginController()
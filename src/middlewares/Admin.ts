import { Request, Response, NextFunction } from 'express'
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'

import Redis from '../utils/Redis'

class AdminMiddleware {
  async veriry(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if(!authHeader) {
      return res.status(401).send({ error: 'Token not provided' })
    }

    const [, token] = authHeader.split(' ')

    try {
      jwt.verify(token, process.env.TOKEN_SECRET as string)

      const user = await Redis.get_infos_by_token(token)

      if(!user.admin) {
        return res.status(401).send({ error: 'User without permission' })
      }
      
      req.user = user.admin
      
      return next()
    } catch (e) {
      if(e instanceof TokenExpiredError) return res.status(401).send({ error: 'Token expired' })
      if(e instanceof JsonWebTokenError) return res.status(401).send({ error: 'Token invalid' })
    }
  }
}

export default new AdminMiddleware()
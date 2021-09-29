import { Router } from 'express'

import login from './Login'
import user from './User'

const routes = Router();

routes.use(login)
routes.use(user)

export default routes;
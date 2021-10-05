import { Router } from 'express'

import login from './Login'
import user from './User'
import mail from './Mail'

const routes = Router();

routes.use(login)
routes.use(user)
routes.use(mail)

export default routes;
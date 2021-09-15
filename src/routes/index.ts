import { Router } from 'express'

import login from './Login'

const routes = Router();

routes.use(login)

export default routes;
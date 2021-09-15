import { Router } from 'express'
import { body } from 'express-validator'

import LoginController from '../controllers/LoginControler'
import { login } from '../validates/LoginValidate'

const routes = Router()

routes.route('/login').post(login(), LoginController.create)

export default routes
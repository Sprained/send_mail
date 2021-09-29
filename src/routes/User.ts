import { Router } from 'express'

import UserController from '../controllers/User/UserController'
import { createUser } from '../validates/UserValidate'
import AdminMiddleware from '../middlewares/Admin'

const routes = Router()

routes.use(AdminMiddleware.veriry)
routes.route('/user').post(createUser(), UserController.create)

export default routes
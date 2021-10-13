import { Router } from 'express'

const routes = Router()

import ConfigMailController from '../controllers/Mail/ConfigMailController'
import { switch_mail } from '../validates/MailValidate'
import AdminMiddleware from '../middlewares/Admin'

routes.use(AdminMiddleware.veriry)
routes.route('/mail/switch').put(switch_mail(), ConfigMailController.changeMailSender)
routes.route('/mail/infos').patch(ConfigMailController.updateInfosMail)

export default routes
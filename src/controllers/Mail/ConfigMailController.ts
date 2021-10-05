import { validationResult } from 'express-validator';
import { Response, Request } from 'express'

import MailConfigService from '../../services/Mail/MailConfigService'

class ConfigMailController {
  async changeMailSender(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      await MailConfigService.change_mail_sender(req.body)

      return res.status(204).send()
    } catch (error) {
      console.log(error)
      return res.status(error.statusCode).send({ 'error': error.message })
    }
  }
}

export default new ConfigMailController()
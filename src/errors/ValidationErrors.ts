import { validationResult } from 'express-validator'

class ValidationErrors {
  async erro422(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  }
}

export default new ValidationErrors()
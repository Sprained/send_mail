import { body } from 'express-validator'

export const createUser = () => {
  return [
    body('name')
      .exists().withMessage('Name is required'),
    body('email')
      .exists().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format'),
    body('phone')
      .exists().withMessage('Phone is required')
      .isNumeric().withMessage('Phone is numeric')
      .isLength({ min: 11, max: 11 }).withMessage('Phone size has to be eleven')
  ]
}
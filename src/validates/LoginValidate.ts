import { body } from 'express-validator'


export const login = () => {
  return [
    body('email')
      .exists().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format'),
    body('password')
      .exists().withMessage('Password is required')
  ]
}
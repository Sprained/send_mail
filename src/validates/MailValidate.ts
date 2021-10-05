import { body } from 'express-validator'

export const switch_mail = () => {
  return [
    body('type')
      .exists().withMessage('Type is required')
      .isIn(['NODEMAILER', 'AWS']).withMessage('Type must be NODEMAILER or AWS')
  ]
}
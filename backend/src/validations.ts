import { body } from 'express-validator'

export const authValidation = [
  body('name', 'Укажите имя').isLength({ min: 3 }),
  body('password', 'Длина меньше 5 символов').isLength({ min: 5 }),
]

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import userModel from '../models/user.js'
import jwt from 'jsonwebtoken'

export const signUp = async (req: Request, res: Response) => {
  try {
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new userModel({
      name: req.body.name,
      passwordHash: hash,
    })

    const user = await doc.save()

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    )

    const { name, _id } = user

    res.json({ name, token, _id })
  } catch (err) {
    res.status(500).json({
      message: 'Неудалось зарегистрироваться',
    })
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ name: req.body.name })

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash)
    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    )

    const { name, _id } = user

    res.json({ name, token, _id })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Неудалось авторизоваться',
    })
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      })
    }

    const { name, _id } = user

    res.json({ name, _id })
  } catch (error) {
    res.status(500).json({
      message: 'Нет доступа',
    })
  }
}

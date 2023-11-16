import { Request, Response } from 'express'
import PhotoModel from '../models/photo.js'

export const create = async (req: Request, res: Response) => {
  try {
    const doc = new PhotoModel({
      url: req.body.url,
    })

    const photo = await doc.save()
    return res.json(photo)
  } catch (error) {
    res.status(500).json('Не удалось добавить фото')
  }
}

export const getAll = async (_req: Request, res: Response) => {
  try {
    const photos = await PhotoModel.find({})

    res.json(photos)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Не удалось получить статьи',
    })
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const photoId = req.params.id

    const doc = await PhotoModel.findById(photoId)

    if (!doc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      })
    }
    res.json(doc)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Не удалось найти статью',
    })
  }
}

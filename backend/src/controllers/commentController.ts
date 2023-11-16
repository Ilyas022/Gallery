import { Request, Response } from 'express'
import commentModel from '../models/comment.js'
import photoModel from '../models/photo.js'
import userModel from '../models/user.js'

export const create = async (req: Request, res: Response) => {
  try {
    const photoId = req.params.id

    const author = await userModel.findById(req.userId)
    if (!author) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      })
    }

    const comment = new commentModel({
      text: req.body.text,
      author: req.userId,
      authorName: author.name,
    })

    const photo = await photoModel.findById(photoId)
    if (!photo) {
      return res.status(404).json({
        message: 'Фото не найдено',
      })
    }

    photo.comments.push(comment)
    const updatedPhoto = await photo.save()

    res.json(updatedPhoto)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Не удалось создать комментарий',
    })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id

    const doc = await photoModel.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: req.body.commentId } },
      },
      { new: true }
    )

    if (!doc) {
      return res.status(404).json({
        message: 'Отказано в доступе',
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

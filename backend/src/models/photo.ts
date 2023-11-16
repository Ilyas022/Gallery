import mongoose, { Document } from 'mongoose'
import { IComment, commentSchema } from './comment.js'

export interface IPhoto extends Document {
  comments: IComment[]
  url: string
}

const photoSchema = new mongoose.Schema<IPhoto>({
  comments: [commentSchema],
  url: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Photo', photoSchema)

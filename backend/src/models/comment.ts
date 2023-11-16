import mongoose, { Document, Types } from 'mongoose'

export interface IComment extends Document {
  text: string
  author: Types.ObjectId
  authorName: string
  photo: Types.ObjectId
}

export const commentSchema = new mongoose.Schema<IComment>({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Comment', commentSchema)

import mongoose from 'mongoose'

interface IUser {
  name: string
  passwordHash: string
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },
})

export default mongoose.model('User', userSchema)

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { authValidation } from './validations.js'
import { commentController, photoController, userController } from './controllers/index.js'
import { handleValidationErrors, checkAuth } from './utils/index.js'
import dotenv from 'dotenv'

dotenv.config()

async function start() {
  await mongoose
    .connect(process.env.MONGODB__URL!)
    .then(() => console.log('Db ok'))
    .catch((err) => console.log('DB error', err))

  const app = express()

  const port = 3003
  app.set('port', port)

  app.use(cors())
  app.use(express.json())

  // Auth
  app.get('/me', checkAuth, userController.getMe)
  app.post('/signin', authValidation, handleValidationErrors, userController.signIn)
  app.post('/signup', authValidation, handleValidationErrors, userController.signUp)

  // Photos
  app.get('/photos', photoController.getAll)
  app.get('/photos/:id', photoController.getOne)
  app.post('/photos', photoController.create)

  // Comments
  app.post('/comment/:id', checkAuth, commentController.create)
  app.delete('/comment/:id', checkAuth, commentController.remove)

  app.listen(process.env.PORT || 3003, () => {
    console.log('Server ok')
  })
}

start()

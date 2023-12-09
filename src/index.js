import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/UserRouter'
import adminRouter from './routes/AdminRouter'
import movieRouter from './routes/MovieRouter'
import bookingsRouter from './routes/BookingRouter'

// constant
dotenv.config()
const app = express()
const PORT = 5000

// cors
app.use(cors())

// middleware
app.use(express.json())
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/movie', movieRouter)
app.use('/booking', bookingsRouter)

// mongo db connect
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@movie-ticket.xyiziw7.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() =>
    app.listen(5000, () => console.log(`Connect to DB is runnig on ${PORT}`)),
  )
  .catch((e) => console.log(e))

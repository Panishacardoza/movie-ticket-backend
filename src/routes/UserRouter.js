import express from 'express'
import {
  deleteUser,
  getAllUsers,
  getBookingOfUser,
  loginUser,
  singUp,
  getUserById,
  updateUser,
} from '../controller/UserController'

const userRouter = express.Router()
// loalhost:5000/user/
userRouter.get('/', getAllUsers)
// localhost:5000/:id
userRouter.get('/:id', getUserById)
// loalhost:5000/user/signup
userRouter.post('/signup', singUp)
// loalhost:5000/user/:id
userRouter.put('/:id', updateUser)
// loalhost:5000/user/:id
userRouter.delete('/:id', deleteUser)
// localhost:5000/user/login
userRouter.post('/login', loginUser)
// localhost:5000/user/bookings/:id
userRouter.get('/bookings/:id', getBookingOfUser)

export default userRouter

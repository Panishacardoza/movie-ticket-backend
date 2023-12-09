import express from 'express'
import {
  deleteBooking,
  getBookingById,
  newBooking,
} from '../controller/BookingController'

const bookingsRouter = express.Router()

bookingsRouter.post('/', newBooking)
bookingsRouter.get('/', getBookingById)
bookingsRouter.delete('/:id', deleteBooking)
export default bookingsRouter

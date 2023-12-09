import express from 'express'
import {
  getMovieById,
  addMovie,
  getMovies,
} from '../controller/MovieController'

const movieRouter = express.Router()

// Routes
// localhost:5000/movie
movieRouter.get('/', getMovies)
// localhost:5000/movie
movieRouter.post('/', addMovie)
// localhost:;5000/:id
movieRouter.get('/:id', getMovieById)

export default movieRouter

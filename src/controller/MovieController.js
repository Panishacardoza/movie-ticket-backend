/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import Movie from '../model/Movie'
import Admin from '../model/Admin'

export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(' ')[1] // Bearer

  if (!extractedToken && extractedToken.trim() === '') {
    return res.status(404).json({ message: 'Token Not Found' })
  }

  let adminId

  // verify token
  jwt.verify(extractedToken, process.env.JWT_TOKEN, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ mesage: `${err.message}` })
    }
    adminId = decrypted.id
  })

  // create a new movie

  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body
  if (
    !title &&
    title.trim() === '' &&
    !description &&
    description.trim() === '' &&
    !posterUrl &&
    posterUrl.trim() === '' &&
    !releaseDate &&
    releaseDate.trim() === ''
  ) {
    return res.status(422).json({ message: 'Invalid Inputs' })
  }

  let movie

  try {
    movie = new Movie({
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      posterUrl,
      actors,
      admin: adminId,
    })

    // create a session for admin prevelage to add movie
    const session = await mongoose.startSession()
    const adminUser = await Admin.findById(adminId)

    session.startTransaction()
    await movie.save({ session })
    adminUser.addedMovies.push(movie)
    await adminUser.save({ session })
    await session.commitTransaction()
  } catch (error) {
    return console.log(error)
  }

  if (!movie) {
    return res.status(500).json({ message: 'Request Failed' })
  }

  return res.status(201).json({ movie })
}

export const getMovies = async (req, res, next) => {
  let movies

  try {
    movies = await Movie.find()
  } catch (err) {
    return console.log(err)
  }

  if (!movies) {
    return res.status(500).json({ message: 'Request Failed' })
  }

  return res.status(200).json({ movies })
}

export const getMovieById = async (req, res, next) => {
  const { id } = req.params
  let movie
  try {
    movie = await Movie.findById(id)
  } catch (err) {
    return console.log(err)
  }

  if (!movie) {
    return res.status(404).json({ message: 'Ivalid Movie Id' })
  }

  return res.status(200).json({ movie })
}

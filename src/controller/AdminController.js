import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../model/Admin'

// localhost:5000/admin/
export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body

  let existingAdmin

  try {
    existingAdmin = await Admin.findOne({ email })
  } catch (error) {
    return console.log(error)
  }

  if (existingAdmin) {
    return res.status(400).json({ message: 'Admin already exists' })
  }

  let admin
  const hashedPassword = bcryptjs.hashSync(password)
  try {
    admin = new Admin({ email, password: hashedPassword })
    admin = await admin.save()
  } catch (error) {
    console.log(error)
  }

  if (!admin) {
    return res.status(500).json({ message: 'Unable to store admin' })
  }

  return res.status(201).json({ admin })
}

// localhost:5000/admin/
export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body
  if (!email && email.trim() === '' && !password && password.trim() === '') {
    return res.status(422).json({ message: 'Invalid Inputs' })
  }

  let existingAdmin
  try {
    existingAdmin = await Admin.findOne({ email })
  } catch (error) {
    console.log(error)
  }

  if (!existingAdmin) {
    return res.status(400).json({ message: 'Admin not found' })
  }

  const isPasswordCorrect = bcryptjs.compareSync(
    password,
    existingAdmin.password,
  )

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Incorrect Password' })
  }

  const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_TOKEN, {
    expiresIn: '7d',
  })

  return res
    .status(200)
    .json({ message: 'Authentication complete', token, id: existingAdmin._id })
}

export const getAdmin = async (req, res, next) => {
  let admins
  try {
    admins = await Admin.find()
  } catch (err) {
    console.log(err)
  }

  if (!admins) {
    return res.status(500).json({ message: 'Not An Admin' })
  }
  return res.status(200).json({ admins })
}

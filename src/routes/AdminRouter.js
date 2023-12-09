import express from 'express'
import { addAdmin, adminLogin, getAdmin } from '../controller/AdminController'

const adminRouter = express.Router()

// localhost:5000/admin/signup
adminRouter.post('/signup', addAdmin)
// localhost:5000/admin/login
adminRouter.post('/login', adminLogin)
// localhost:5000/admin/
adminRouter.get('/', getAdmin)
export default adminRouter

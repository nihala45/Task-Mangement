import {Router} from 'express'
import { login, register, verifyOtp  } from '../controller/userController.js'






const userRoutes = Router()
userRoutes.post('/register',register)
userRoutes.post('/verify_otp/:id',login)
userRoutes.post('/login',verifyOtp)



export default userRoutes
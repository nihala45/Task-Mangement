import {Router} from 'express'
import { login, registerUser, verifyOtp  } from '../controller/userController.js'






const userRoutes = Router()
userRoutes.post('/register',registerUser)
userRoutes.post('/verify_otp/:id',login)
userRoutes.post('/login',verifyOtp)



export default userRoutes
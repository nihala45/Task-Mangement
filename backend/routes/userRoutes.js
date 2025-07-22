import {Router} from 'express'
import { loginUser, registerUser, verifyOTP } from '../controller/userController.js'






const userRoutes = Router()
userRoutes.post('/register',registerUser)
userRoutes.post('/verify_otp/:id',verifyOTP)
userRoutes.post('/login',loginUser)



export default userRoutes
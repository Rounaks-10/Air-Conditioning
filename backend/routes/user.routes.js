import express from 'express'
import {loginUser,signUser,verifyUser,adminLogin} from '../controllers/user.controller.js'

const userRouter =express.Router()

userRouter.post('/register',signUser)
userRouter.post("/verify", verifyUser);
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)


export default userRouter;
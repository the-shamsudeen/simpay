import { Router } from "express";
import { updateUserProfile, deleteUser, changePassword } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const userRouter = Router()

userRouter.put('/:id', authorize, updateUserProfile)
userRouter.delete('/:id', authorize, deleteUser)
userRouter.put('/password/:id', authorize, changePassword)



export default userRouter
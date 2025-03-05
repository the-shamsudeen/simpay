import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js"
import {signUpSchema, signInSchema} from "../validators/auth.validators.js"

const authRouter = Router()

authRouter.post('/sign-up',validate(signUpSchema) ,  signUp)
authRouter.post('/login', validate (signInSchema), signIn)

export default authRouter;
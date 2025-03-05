import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import connectDB from "./database/mongodb.js";
import userRouter from "./routes/user.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())



app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`app listening on port: http://localhost:${PORT}`)
})
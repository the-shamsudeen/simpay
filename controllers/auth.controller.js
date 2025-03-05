import mongoose, { startSession } from 'mongoose'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'
import { TIERS } from '../config/tiers.config.js'


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {firstName, lastName, username, phoneNumber, email, profileImage, password, bvn} =req.body

        const userExists = await User.findOne({email})
        if(userExists){
            const error = new Error (`user with email: ${userExists.email} already exist`)
            error.statuscode = 409
            throw error
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create([
            {
                firstName,
                lastName,
                username,
                phoneNumber,
                email,
                bvn,
                profileImage,
                password: hashPassword,
                tier: TIERS.Tier_1.name,
                dailyLimit: TIERS.Tier_1.dailyLimit,
                maximumAccountLimit: TIERS.Tier_1.maximumAccountBalance
            }],
            { session }
        );
        

        const token = jwt.sign( { userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: 'user successfully created',
            data:{
                token,
                user: newUser
            }
        })

    } catch (error) {
        
        await session.abortTransaction()
        session.endSession()

        next(error)
    }
}

export const signIn = async (req, res, next ) => {
    try {
        const {phoneNumber, password} = req.body

        const user = await User.findOne({ phoneNumber }).select("+password");

    if (!user){
        const error = new Error ('no account with such number')
        error.statuscode = 404
        throw error
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        const error = new Error ('invalid password')
        error.statuscode = 401
        throw error
    }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        res.status(200).json({
            success: true,
            message: 'sign in succeful',
            data:{
                token,
                user: user
            }
        })
    } catch (error) {
        next(error)
    }


}

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const updateUserProfile = async (req, res) => {
    try {

        const {firstName, lastName, username, email, bvn, phoneNumber, profileImage} = req.body

        if(!req.user || !req.user._id){ res.status(404).json({message: "unathorized: user not found", error: error.message})}


        const user = await User.findByIdAndUpdate(req.user._id, {
            firstName: firstName || req.user.firstName,
            lastName: lastName || req.user.lastName,
            username: username || req.user.username,
            phoneNumber: phoneNumber || req.user.phoneNumber,
            email: email || req.user.email,
            bvn: bvn|| req.user.bvn,
            profileImage: profileImage || req.user.profileImage
        }, { new: true, runValidators: true})

        if (!user) {
            res.status(404).json({message: "user not found"})
        }

        res.status(200).json({
            success: true,
            message: "user info updated",
            data:{
                updatedInfo: user
            }
        })
    } catch (error) {
       next(error)
      
    }
}


export const deleteUser = async (req, res) => {
   try {
    const user = await User.findByIdAndDelete(req.user._id)

    res.status(200).json({
        success: true,
        message: `user with is ${user._id} deleted successfully`})
   } catch (error) {
    next(error)
   }
}


export const changePassword = async (req, res, next) => {

    try {
        const {oldPassword, newPassword} = req.body

        if(!oldPassword || !newPassword){
            res.status(400).json({message: "both old password and new password field required"})
        }

        const user = await User.findById(req.user._id).select("+password")
        if(!user){ res.status(404).json("user not found")}


        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch){
            res.status(400).json({message: "old password is incorrect"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword
        await user.save()

        res.status(200).json({
            success: true,
            message: "password has been saved sucessfully"
        })
    } catch (error) {
        next(error)
    }
}
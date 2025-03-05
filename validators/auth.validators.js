import Joi from "joi";

export const signUpSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    username: Joi.string().alphanum().max(20).required(),
    phoneNumber: Joi.string().pattern(/^\d{11}$/).required().messages({
        "string.pattern.base": "Phone number must be exactly 11 digits",
        "any.required": "Phone number is required"
    }),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).pattern(/^\d{6}$/).required().messages({
        "string.pattern.base": "Password must be exactly 6 digits",
        "string.length": "Password must be exactly 6 characters long",
        "any.required": "Password is required"
    }),
    bvn: Joi.string()  // ✅ Ensure it's a string, not a number
        .length(11)
        .pattern(/^\d{11}$/)
        .required()
        .messages({
            "string.pattern.base": "BVN must be exactly 11 digits",
            "string.length": "BVN must be exactly 11 characters long",
            "any.required": "BVN is required"
        })
}).options({ stripUnknown: true, convert: true }); //  Ensure Joi handles unexpected fields properly


export const signInSchema = Joi.object({
    phoneNumber: Joi.string().pattern(/^\d{11}$/).required().messages({
        "string.pattern.base": "Phone number must be exactly 11 digits",
        "any.required": "Phone number is required"
    }),
    password: Joi.string().length(6).pattern(/^\d{6}$/).required().messages({
        "string.pattern.base": "Password must be exactly 6 digits",
        "string.length": "Password must be exactly 6 characters long",
        "any.required": "Password is required"
    })
});
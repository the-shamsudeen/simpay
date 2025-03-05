const validate = (schema) => {
    return (req, res, next) => {
       // console.log("🔍 Incoming Request Body:", req.body); //  Debug incoming data

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((err) => err.message),
            });
        }

        req.body = value; // ✅ Ensure sanitized values are used
        next();
    };
};

export default validate;

const errorMiddleware = (err, req, res, next) =>{
    try {
        let error = {...err}
        error.message = err.message
        console.log(err)

        // mongoose bad object id
        if(err.name === 'castError'){
            const message  = 'Resource not found'
            error = new Error(message)
            error.statuscode = 404

            // mongoose duplicate key

            if(err.code === 11000){
                const message = 'Duplicate field value entered'
                error = new Error (message)
                error.statuscode = 400
            }

            // mongoose validation error
            if(err.name === 'validationError'){
                const message = Object.values(err.errors).map(values.message)
                error = new Error (message.join(', '))
            }

            res.send(error.statuscode || 500).json({sucess: false, error: error.message || 'server error'})
            
        }
    } catch (error) {
        next(error)
    }
}


export default errorMiddleware
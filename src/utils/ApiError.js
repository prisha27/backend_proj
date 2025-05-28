class ApiError extends Error {
    constructor(
        statusCode,
        message= "something went wrong",
        errors = []
    ){
        //overwrite
        super(message)
        
        this.statusCode = statusCode
        this.data = null
        this.message = message
                this.success = false
        this.errors = errors


    }
}

export default ApiError
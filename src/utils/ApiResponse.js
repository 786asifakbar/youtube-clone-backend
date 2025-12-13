class ApiResponse{
    constructor(statusCode , data , massage = "Success"){
        this.statusCode = statusCode,
        this.data = data,
        this.massagec = massage,
        this.success = statusCode < 400

    }
}
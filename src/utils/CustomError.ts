export default class CustomError extends Error {
    public status: number;

    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }
}
export const errorHandler = (err, req, res, next) => {
    const {status = 500} = err
    console.log('Error Message: ', err.message);
    res.status(status)
    res.send({
        message: err.message,
        // stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
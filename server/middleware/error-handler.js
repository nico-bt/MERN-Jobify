const errorHandlerMiddleware = (err, req, res, next) => {
    // Email already registered:
    if(err.code && err.code == 11000) {
        return res.status(400).json({msg:`Email ${err.keyValue.email} is already registered`})
    }

    res.status(500).json(err)
}

module.exports = errorHandlerMiddleware
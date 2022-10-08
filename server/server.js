const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/notFoundMiddleware.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')

const port = process.env.PORT || 5000

// Routes
//************************************************************************************/
app.get('/', (req, res) => {
  res.send('Hello World')
})


// Middleware - 404 not found and Error-handler
//************************************************************************************/
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


// Running app
//************************************************************************************/
app.listen(port, ()=>{
    console.log("Running on port", port);
})
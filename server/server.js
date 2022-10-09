const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require("mongoose")

const notFoundMiddleware = require('./middleware/notFoundMiddleware.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')

app.use(express.json())

const authRoutes = require("./routes/authRoutes")

const port = process.env.PORT || 5000

// Routes
//************************************************************************************/
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use("/api/auth", authRoutes)

// Middleware - 404 not found and Error-handler
//************************************************************************************/
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


//Connect to DB and run app
//************************************************************************************/
mongoose.connect(process.env.MONGODB_URI)
    .then(
        app.listen(process.env.PORT, ()=>{
            console.log(`Connected to DB & running on port: ${process.env.PORT}`)
        })
    )
    .catch(
        (err)=>console.log(err)
    )
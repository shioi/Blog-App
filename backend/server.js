require("dotenv").config()
const express = require('express')
const blogRoutes = require('./routes/blogs')
const mongoose = require('mongoose')
//creating the express app
app = express()

//all middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//all route handelers
app.use('/api/blogs', blogRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
      console.log("listening at PORT %d", process.env.PORT)
    })
    })
    .catch((error) => {
    console.log(error)  
})







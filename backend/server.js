require("dotenv").config()
const express = require('express')
const blogRoutes = require('./routes/blogs')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const requireAuth = require('./middleware/requireAuth')
const User = require('./models/userModel')
const Blog = require('./models/blogModel')
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
app.use('/api/user', userRoutes)

app.use(requireAuth)
app.get( '/api/account',async (req, res) => {

    console.log("hello")
    const username = req.user.username

    const user = await User.findOne({ username })
    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    return res.status(200).json(user)
})

app.get('/api/accountpost', async (req, res) => {
    const username = req.user.username

    const posts = await Blog.find({ username })
    if (!posts) {
        return res.status(404).json({ error: 'No posts from the user' })
    }
    return res.status(200).json(posts)
        
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
      console.log("listening at PORT %d", process.env.PORT)
    })
    })
    .catch((error) => {
    console.log(error)  
})


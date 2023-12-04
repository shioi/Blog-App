const Blog = require('../models/blogModel')

// get all the blogs

const getBlogs = async (req, res) => {
    const blogs = await Blog.find({})

    res.status(200).json(blogs)
}


//get single blog


// create new blog
const createBlog = async (req, res) => {
    const { username, title, body} = req.body
    const likes = 0
    const Image = "asd"
    try {
        const blog = await Blog.create({ username, title, body, Image, likes })
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//delete a blog


// update a blog

//export the functions
module.exports = {
    createBlog,
    getBlogs
}
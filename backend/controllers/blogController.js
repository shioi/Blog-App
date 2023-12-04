const Blog = require('../models/blogModel')
const mongoose = require('mongoose')
// get all the blogs

const getBlogs = async (req, res) => {
    const blogs = await Blog.find({})

    res.status(200).json(blogs)
}


//get single blog
const getBlog = async (req, res) => {
    //find the id
    const { id } = req.params

    //verify id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such blog'})
    }

    const blog = await Blog.findById(id)

    if (!blog) {
        return res.status(404).json({error: 'No such blog'})
    }

    return res.status(200).json(blog)
}


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
const deleteBlog = async (req, res) => {
    //find the id
    const { id } = req.params

    //verify id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such blog'})
    }   

    const blog = await Blog.findOneAndDelete({ _id: id })
    
    if (!blog) {
        return res.status(404).json({error: "No such blog"})
    } 

    return res.status(200).json(blog)
}


// update a blog
const updateBlog = async (req, res) => {
    //find the id
    const { id } = req.params
    console.log(req.body)

    //verify id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such blog'})
    }   

    const blog = await Blog.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!blog) {
        return res.status(404).json({error: "No such blog"})
    } 

    return res.status(200).json(blog)
    
}



//export the functions
module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog
}
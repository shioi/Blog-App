const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const fileUpload = require('express-fileupload');
//aws
const AWS = require('aws-sdk');


const s3 = new AWS.S3();

const mongoose = require('mongoose');
// get all the blogs

const getBlogs = async (req, res) => {
    
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
}


//get single blog
const getBlog = async (req, res) => {
    console.log("hello")    
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

const upload = (req) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = req.originalfilename + "-" + uniqueSuffix
    const params = {
        Bucket: 'fp-blog-images',
        Key: filename,
        Body: req.buffer
    };
    s3.upload(params, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error uploading file');
        }
        console.log(`Image inserted: ${Image}`)
    })
    const Image = "https://fp-blog-images.s3.amazonaws.com/" + filename
    return Image
}

// create new blog
const createBlog = async (req, res) => {
    var Image = "https://fp-blog-images.s3.amazonaws.com/lambda_cover.png"
    if (req.file) {
        Image = upload(req.file)
    }   

    const { title, body} = req.body
    const username = req.user.username
    const likes = 0
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
    if (req.file) {
        const Image = upload(req.file)
        req.body.Image = Image
    }
    
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
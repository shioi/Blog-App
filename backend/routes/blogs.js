const express = require("express")
const {createBlog, getBlogs, getBlog, deleteBlog, updateBlog} = require("../controllers/blogController")

const router = express.Router()

//GET request for getting blog posts
router.get('/', getBlogs)

//POST request for blog
router.post('/',  createBlog)

//GET BLOG WITH A ID
router.get('/:id', getBlog)

//DELETE BLOG WITH A ID
router.delete('/:id', deleteBlog)

//UPDATE BLOG WITH A ID
router.patch('/:id', updateBlog)

module.exports = router


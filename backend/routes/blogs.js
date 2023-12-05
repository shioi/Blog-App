const express = require("express")
const {createBlog, getBlogs, getBlog, deleteBlog, updateBlog} = require("../controllers/blogController")
const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

//GET request for getting blog posts
router.get('/', getBlogs)

//GET BLOG WITH A ID

router.get('/:id', getBlog)

//requires authentications
router.use(requireAuth)



//POST request for blog 
router.post('/',  createBlog)

//DELETE BLOG WITH A ID
router.delete('/:id', deleteBlog)

//UPDATE BLOG WITH A ID
router.patch('/:id', updateBlog)


 
module.exports = router


const express = require("express")
const {createBlog, getBlogs, getBlog, deleteBlog, updateBlog} = require("../controllers/blogController")
const router = express.Router()
const multer = require('multer')


const requireAuth = require('../middleware/requireAuth')



//GET request for getting blog posts
router.get('/', getBlogs)

//GET BLOG WITH A ID

router.get('/:id', getBlog)

//requires authentications
router.use(requireAuth)

  // Multer configuration for file uploads
  /*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images') // Save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname) // Append current datetime to the original file name
        req.filename = uniqueSuffix + '-' + file.originalname
    }
  });*/

const upload = multer({
  storage: multer.memoryStorage()
  })

// Assuming your createBlog endpoint is '/api/blogs' and uses the createBlog function
router.post('/', upload.single('file'), createBlog);


//DELETE BLOG WITH A ID
router.delete('/:id', deleteBlog)

//UPDATE BLOG WITH A ID
router.patch('/:id', upload.single('file'),  updateBlog)


 
module.exports = router


const express = require("express")

const router = express.Router()

//GET request for getting blog posts
router.get('/', (req, res) => {
    res.json({mssg: "GET ALL BLOGS"})
})

//POST request for blog
router.post('/', (req, res) => {
    res.json({mssg: "POST BLOGS"})   
})

//GET BLOG WITH A ID
router.get('/:id', (req, res) => {
    res.json({mssg: "GET with certain ID"})
})

//DELETE BLOG WITH A ID
router.delete('/:id', (req, res) => {
    res.json({mssg: "DELETE with certain ID"})
})

//UPDATE BLOG WITH A ID
router.patch('/:id', (req, res) => {
    res.json({mssg: "PATCH with certain ID"})
})

module.exports = router


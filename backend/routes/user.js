const express = require("express")

//controller functions
const {loginUser, signUser, accountInfo} = require('../controllers/userController')

const router = express.Router()

//Login 
router.post('/login', loginUser)

//Registration
router.post('/signup', signUser)


module.exports = router
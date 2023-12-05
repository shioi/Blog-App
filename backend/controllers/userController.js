const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// logging the users
const loginUser = async (req, res) => {
    const { username, password } = req.body
    var isMail = false
    var firstarg = username

    if (!username) {
        const { email } = req.body
        isMail = true
        firstarg = email
    }

    try {
        const user = await User.login(firstarg, password, isMail)
        const username = user.username
        //create token
        const token = createToken(user._id)

        res.status(200).json({username, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}
    


//Registraions of the user
const signUser = async (req, res) => {
    const {email, username, password} = req.body

    try {
        const user = await User.signup(email, username, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//for account info
const accountInfo = async (req, res) => {
    //get witt user name
    console.log("hello")
    const username = req.user.username

    const user = await User.findOne({ username })
    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    return res.status(200).json(user)

}


module.exports = {loginUser, signUser}
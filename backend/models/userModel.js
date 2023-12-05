const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

//making of static method
userSchema.statics.signup = async function (email, username, password) {
    console.log(email, username, password)
    //validation
    if (!email || !username || !password) {
        throw Error("All fields must be filled")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email must be valid")        
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password must be strong")
    }


    const exists = await this.findOne({ username })
    //not unique username
    if (exists) {
        throw Error ('Username already exists')
    }

    //save user to the dataset
    //hasign
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, username, password: hash })
    
    return user

}

//for login method
userSchema.statics.login = async function (username, password, Isemail=false) {
    if (!username || !password) {
        throw Error("All the field should be field")
    }

    //checking if it was email that user entered
    var user;
    if (Isemail) {
        console.log(username)
        user = await this.findOne({email: username})
    } else {
        user = await this.findOne({ username })   
    }
    //not unique username
    if (!user) {
        throw Error("Incorrect Email or Username")
    }

    //match the password
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error("incorrect Password")
    }

    return user    
    
}

//register to the model
module.exports = mongoose.model('User', userSchema)
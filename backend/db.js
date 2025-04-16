const mongoose = require("mongoose")
const { number, string } = require("zod")
mongoose.connect(" ")

const UsersSchema = new mongoose.Schema({
    id: String,
    username: {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
    },
    password: {
        type : String,
        required : true,
        minLength: 2,
    },
    firstName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
})

const AccountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance:{
        type:Number,
        required : true
    }

})

const User = mongoose.model("User",UsersSchema)
const Account = mongoose.model("Account",AccountSchema)
module.exports = {
    User,
    Account
}
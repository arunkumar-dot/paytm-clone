const express = require("express")
const cors = require("cors")
const userRouter = express.Router()


const zod = require("zod")
const {User, Account} = require("../db")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config")
const { authMiddleware } = require("../middleware")

const signupBody = zod.object({
    username : zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
})

userRouter.post("/signup",async(req,res) =>{
    const {success} = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({username : req.body.username})

    if(existingUser){
        return res.status(411).json({
            message : "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id
    
    await Account.create({
        userId,
        balance : 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId,
    },JWT_SECRET)

    res.json({
        message : "User Created Succefully",
        token : token
    })
})

const signInBody = zod.object({
    username:zod.string(),
    password : zod.string(),
})

userRouter.post("/signin",async(req,res) => {
    const {success} = signInBody.safeParse(req.body)
    
    if(!success){
        return res.status(403).json({
            message : "incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    const userId = user._id
    if(user){
        const token = jwt.sign({
            userId,
        },JWT_SECRET)

        res.json({
            token:token
        })
        return
    }
    
    res.status(411).json({
        message : "Error"
    })
})

const updateUserBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional(),
})

userRouter.put("/",authMiddleware,async(req,res,next) => {
    const {success} = updateUserBody.safeParse(req.body)
    if(!success){
        return res.status(403).json({
            message : "error"
        })
    }

    await User.updateOne({_id : req.user_id},req.body)

    res.json({
        message: "user details updated"
    })
})

userRouter.get("/bulk",authMiddleware,async(req,res) => {
    const filter = req.query.filter || ""  
    const users = await User.find({
        $or:[
            {firstName : {
                "$regex": filter
            }},
            {lastName:{
                "$regex" : filter
            }}
        ]
        
    })

    const filteredusers = users.filter(user => user._id.toString() !== req.userId.toString()
    );
    
    
    res.json({
        user : filteredusers.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
            
        }))
    })
})

module.exports = userRouter
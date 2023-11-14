const express = require("express")
const userRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// Create a new User
userRouter.post('/signup', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username.toLowerCase() })
        if (user) {
            res.status(403)
            return next(new Error('Username is taken'))
        }
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
        return res.status(201).send({ token, user: savedUser.withoutPassword() })
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// Login

userRouter.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username.toLowerCase() })
        if (!user) {
            res.status(403)
            return next(new Error('Incorrect Username or Password'))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(403)
                return next(new Error('Username or Password is incorrect.'))
            }
            if (!isMatch) {
                res.status(403)
                return next(new Error('Username or Password is incorrrect'))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ token, user: user.withoutPassword() })
        })

    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = userRouter
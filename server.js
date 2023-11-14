const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const { expressjwt } = require('express-jwt')

mongoose.connect(process.env.MONGOURI, console.log('Connected to DB'))

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', require('./routes/userRouter'))
app.use('/api/main', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/main/todos', require('./routes/todoRouter'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(7550, () => {
    console.log('server is running on port 7550')
})
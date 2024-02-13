const express = require('express')
const todoRouter = express.Router()
const Todo = require('../models/todo')
// test
//get all user todos
todoRouter.get('/user', async (req, res, next) => {
    try {
        const todos = await Todo.find({ userId: req.auth._id })
        return res.status(200).send(todos)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

todoRouter.post('/', async (req, res, next) => {
    try {
        req.body.userId = req.auth._id
        const newTodo = new Todo(req.body)
        const savedTodo = await newTodo.save()
        return res.status(201).send(savedTodo)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

todoRouter.delete('/:todoID', async (req, res, next) => {
    try {
       const deletedTodo = await Todo.findOneAndDelete({_id: req.params.todoID, userId: req.auth._id})
       return res.status(200).send(`Deleted todo: ${deletedTodo.todo}`)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

todoRouter.put('/:todoID', async (req, res, next) => {
    try{
        const updatedTodo = await Todo.findOneAndUpdate({_id: req.params.todoID, userId: req.auth._id}, req.body, {new: true})
        return res.status(201).send(updatedTodo)
    } catch(err){
        res.status(500)
        return next(err)
    }
})


module.exports = todoRouter
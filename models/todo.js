const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    todo: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Todo', todoSchema)

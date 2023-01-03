const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: {
        required: true,
        type: String
    },
    pass: {
        required: true,
        type: String
    },
    notes:{
        type: [{title: String, text: String}]
    }
})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/Note.js')
const ErrorHandling = require('./ErrorHandling')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/noteApp')
    .then(() => {
        console.log('Connected')
    })
    .catch(err => {
        console.log(err)
    })
app.use(cors())
app.use(express.json())
app.get('/', async (req, res, next) => {
    try {
        const dataNotes = await Note.find({});
        res.json(dataNotes);
    } catch (err) {
        next(err)
    }
});

app.post('/', async (req, res, next) => {
    try {
        const newNote = new Note(req.body)
        const createdNote = await newNote.save();
        res.json(createdNote);
    } catch (err) {
        next(err)
    }
});

app.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        await Note.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        res.send('edited')
    } catch (err) {
        next(err)
    }
});

app.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.send('deleted');
    } catch (err) {
        next(err)
    }
});

const handleValidationErr = (err) => {
    return new ErrorHandling(`Validation Failed, ${err.message}`, 400)
};

app.use((err, req, res, next) => {
    if (err.name === 'Validation Error') {
        err = handleValidationErr(err)
        next(err)
    };
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).json({ errorMessage: message, errorCode: status });
});

app.listen(8888, () => {
    console.log('Connected')
});
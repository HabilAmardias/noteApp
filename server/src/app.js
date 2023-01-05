require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/Note.js')
const ErrorHandling = require('./ErrorHandling')
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected')
    })
    .catch(err => {
        console.log(err)
    })


app.use(cors({
  origin: ["http://localhost:5173", "https://note-app.onrender.com"]  
}))
app.use(express.json())


app.get('/users', async (req, res, next) => {
    try {
        const dataUsers = await Note.find({});
        res.json(dataUsers);
    } catch (err) {
        next(err);
    }
});

app.post('/users', async (req, res, next) => {
    try {
        const newUser = new Note(req.body);
        const createdUser = await newUser.save();
        res.json(createdUser);
    } catch (err) {
        next(err);
    }
});

app.delete('/users/:id', async(req,res,next)=>{
    try{
        const {id} = req.params;
        const deleteUser = await Note.findByIdAndDelete(id);
        res.json(deleteUser);
    } catch{
        next(err);
    }
});

app.get('/users/:id', async(req,res,next)=>{
    try{
        const {id} = req.params;
        const user = await Note.findById(id);
        res.json(user);
    } catch {
        next(err);
    }
});

app.delete('/users/:id/notes/:index', async(req,res,next)=>{
    try {
        const id = req.params.id;
        const index = req.params.index;
        const user = await Note.findById(id);
        user.notes.splice(parseInt(index),1);
        await user.save();
        res.json(user);
    } catch {
        next(err);
    }
});

app.post('/users/:id/notes', async(req,res,next) => {
    try {
        const id = req.params.id;
        const user = await Note.findById(id);
        const {title, text} = req.body;
        user.notes.push({title: title,text: text});
        await user.save();
        res.json(user);
    } catch {
        next(err);
    }
});

app.patch('/users/:id/notes/:index', async(req, res, next)=>{
    try{
        const id = req.params.id;
        const index = req.params.index;
        const user = await Note.findById(id);
        const {title, text} = req.body;
        user.notes.splice(parseInt(index),1,{title: title, text: text});
        await user.save();
        res.json(user);
    } catch {
        next(err);
    }
})


const handleValidationErr = (err) => {
    return new ErrorHandling(`Validation Failed, ${err.message}`, 400);
};

app.use((err, req, res, next) => {
    if (err.name === 'Validation Error') {
        err = handleValidationErr(err);
        next(err);
    } else{
        next(err);
    }
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).json({ errorMessage: message, errorCode: status });
});


app.listen(8888, () => {
    console.log('Connected');
});
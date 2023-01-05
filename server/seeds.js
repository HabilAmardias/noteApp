require('dotenv').config()
const mongoose = require('mongoose')
const Note = require('./src/models/Note.js')
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected')
    })
    .catch(err => {
        console.log(err)
    })

const n = new Note({
    user: "potatomain",
    pass: "Welxv126"
})
n.save()
    .then((n)=>{
        console.log(n);
    })
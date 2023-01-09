const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const noteSchema = new mongoose.Schema({
    user: {
        required: true,
        type: String
    },
    pass: {
        required: true,
        type: String
    },
    notes: [{title: String, text: String}]
});

noteSchema.statics.findAndAuth = async function(user, pass){
    const findUser  = await this.findOne({user});
    const isValid = await bcrypt.compare(pass, findUser.pass);
    return isValid ? findUser : false;
}

noteSchema.pre('save', async function (next){
    if (!this.isModified('pass')){
        return next();
    } else {
        this.pass = await bcrypt.hash(this.pass,12);
        next();
    }
})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note
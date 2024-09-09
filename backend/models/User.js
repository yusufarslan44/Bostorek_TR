const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [emailRegex, 'Invalid email addresss']
    },
    password: {
        type: String,
        reqiured: true,
        trim: true,
        maxLength: 26,
        minLength: 4
    },

    admin: {
        type: Boolean,
        default: false
    }

},
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})
const User = mongoose.model('User', userSchema)
module.exports = User;
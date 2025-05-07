const { Schema, model } = require('../connection');

const signupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: 'Not Specified'
    },
    avatar: {
        type: String,
        default: 'default.png'
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = model('signup', signupSchema);
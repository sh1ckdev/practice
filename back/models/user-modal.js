const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    bio: { type: String },
    avatar: { type: Buffer }
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
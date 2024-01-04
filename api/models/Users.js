const mongoose = require('moongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String

}, { timestamps: true });

const Usermodel = mongoose.model('User', UserSchema);
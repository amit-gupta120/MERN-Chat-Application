const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const User = require('./models/Users');

dotenv.config();
// console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);
const jwtSecert = process.env.JWT_SECERT;
const app = express();
app.get('/login', (req, res) => {
    res.json('login successfull')
});
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const createdUser = await User.create({ username, password })
    res.json({ userId: createdUser._id }, jwtSecert, (err, token) => {
        if (err) throw err
        res.cookie('token', token).status(201).json("OK");
    });

})
app.listen(4040);



const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const User = require('./models/Users')
const cors = require('cors')


dotenv.config();
// console.log(process.env.MONGO_URL);
const jwtSecert = process.env.JWT_SECERT
// console.log(jwtSecert);

const app = express()
app.use(express.json());
const port = 4040
mongoose.connect(process.env.MONGO_URL)
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.get('/test', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const createdUser = await User.create({ username, password })
        jwt.sign({ userId: createdUser._id }, jwtSecert, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json({
                id: createdUser._id
            })
        })
    } catch (err) {
        // console.log(err);
        if (err) throw err;
        res.status(500).json("error")

    }





})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

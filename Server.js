const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const User = require('./models/user')

app.use(express.json())

//recuperer dotenv
require('dotenv').config()
const uri = process.env.MONGO_URI


//Lunch a server with express in the server.js file

app.get('/', (req, res) =>{
    res.send('Welcome')
})

app.listen(port , ()=>{
    console.log(`listening on ${port}`); 
});

//Connect your database
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
.then(()=>{
    console.log('Connected to database');
})
.catch((err)=>{
    console.log('Error connecting');
});

//create routes

//Get all user
app.get('/user' ,async (req, res) => {
    try{
        const data = await User.find()
        res.json(data);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
})

//ADD A NEW USER TO THE DATABASE 
app.post('/user', async (req, res) => {
    const users = new User ({
        name: req.body.name,
        mail : req.body.mail,
    })
    try {
        const userSave = await users.save()
        res.status(200).json(userSave)
    }
    catch (err) {
        res.status(500).json({ message : err})
    }
})

// EDIT A USER BY ID 
app.put('/user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updated = await User.findByIdAndUpdate(id , {name : req.body.name , mail : req.body.mail} , {new : true})
        res.status(200).json(updated)
    }
    catch (err) {
        res.status(500).json({ message : err})
    }
})


//REMOVE A USER BY ID 
app.delete('/user/:id' , async (req, res) => {
    try {
        const id = req.params.id
        const delet = await User.findByIdAndDelete(id)
        res.send(delet);
    }
    catch (err) {
        res.status(404).json({message : err.message});
    }
})
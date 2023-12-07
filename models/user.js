const mongoose = require('mongoose');

//creat mongoose schema
const userSchema = new mongoose.Schema({
    name : {type : 'string' , required : true},
    mail : {type : 'string' , required : true , lowercase : true},
})

const User = mongoose.model('User', userSchema)

//export schema

module.exports = mongoose.model('User', userSchema, )
const axios = require('axios');

const newUser = {
  name: 'John Doe',
  mail: 'john.doe@example.com',
};

axios.post('http://localhost:5000/user', newUser)
  .then(response => {
    console.log('Nouvel utilisateur créé :', response.data);
  })
  .catch(error => {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
  });

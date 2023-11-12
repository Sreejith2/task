const mongoose = require('mongoose');
const dbUrl = "mongodb+srv://sreejithn2002:Test123@cluster0.2vilcq8.mongodb.net/?retryWrites=true&w=majority";
const collectionName = "bhooti";

mongoose.connect(dbUrl)
  .then(() => {
    console.log('Connected to the MongoDB database');
  })
  .catch((err) => {
    console.error('Failed to connect to the database: ', err);
  });

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true }
  });

  const linkSchema = new mongoose.Schema({
    link:{type:String,required:true},
    slink:{type:String,required:true}
  })

  const User = mongoose.model('users', userSchema,collectionName);
  const Link = mongoose.model('links', linkSchema,collectionName);
  module.exports = {User,Link};
  

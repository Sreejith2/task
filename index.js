const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const dbUrl = "mongodb+srv://sreejithn2002:Test123@cluster0.2vilcq8.mongodb.net/?retryWrites=true&w=majority";
const collectionName = "bhooti";
// mongoose.connect(dbUrl)
//   .then(() => {
//     console.log('Connected to the MongoDB database');
//   })
//   .catch((err) => {
//     console.error('Failed to connect to the database: ', err);
//   });

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.json());

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String },
//   dob: { type: Date, required: true },
//   address: { type: String, required: true },
//   pincode: { type: String, required: true },
//   phone: { type: String, required: true }
// });

// const User = mongoose.model('users', userSchema,collectionName);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/task1", (req, res) => {
  res.render("task1");
});
app.get("/task2", (req, res) => {
  res.render("task2");
});
app.get("/task2/contact", (req, res) => {
  res.render("contact");
});
app.get("/task2/about", (req, res) => {
  res.render("about");
});
app.get("/task2/blog", (req, res) => {
  res.render("blog");
});
app.get("/task3", (req, res) => {
  res.render("bmi");
});

app.post("/task3", (req, res) => {
  console.log(req.body);
  let height,h;
  const unit = req.body.unit;
  const weight = parseFloat(req.body.weight);

  if (unit === 'cm') {
    height = parseFloat(req.body.cm);
    height *= 0.01;
  } else {
    h = parseInt(req.body.feets);
    let inches = parseFloat(req.body.inches);
    height = h * 0.3048 + inches * 0.0254;
    console.log(height);
  }

  const bmi = weight / (height * height);

  res.render("bmi", {
    bmi: bmi.toFixed(2)
  });
});


app.get("/task4", (req, res) => {
  res.render("task4");
});

app.post("/task4",async (req,res)=>{
  let fname="";let lname="";
  const name = req.body.name;
  const dob = req.body.dob;
  const address = req.body.address;
  const pin = req.body.pincode;
  const phone = req.body.phone;
  const names = name.split(" ");
  if(names.length>1){
    fname = names.slice(0, -1).join(' ');
    lname = names[names.length-1];
  }else{
    fname=name;
    lname="";
  }
  const newUser = new User({
    username:name,
    firstName:fname,
    lastName:lname,
    dob:dob,
    address:address,
    pincode:pin,
    phone:phone
  });
  try {
    await newUser.save();
    console.log('User data inserted successfully:', newUser);
  } catch (err) {
    console.error('Failed to insert user data: ', err);
    res.status(500).send('Failed to insert user data');
  }
});

app.get("/task4/view", async (req, res) => {
  try {
    const users = await User.find();
    res.render("view", { users }); 
  } catch (err) {
    console.error('Failed to retrieve user data: ', err);
    res.status(500).send('Failed to retrieve user data');
  }
});

app.listen(3000, () => {
  console.log(`server started at http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.json());

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
  let height = parseFloat(req.body.height);
  let unit = req.body.unit;
  let weight = parseFloat(req.body.weight);

  if (unit === 'in') {
    height *= 0.0254;
  } else if (unit === 'ft') {
    height *= 0.3048;
  }



  const bmi = weight / (height * height);

  res.render("bmi", {
    bmi: bmi.toFixed(2)
  });
});








app.listen(3000, () => {
  console.log(`server started at http://localhost:${port}`);
});

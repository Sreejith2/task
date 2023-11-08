const express = require('express');
const app = express();
const port = 3000;


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


app.listen(3000, () => {
  console.log(`server started at http://localhost:${port}`);
});

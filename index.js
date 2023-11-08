const express = require('express');
const app = express();
const port = 3000;


app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.json());

app.get("/", (req, res) => {
  const taskData = {
    task1: "https://helloworld-p5of.onrender.com",
  };
  res.render("home", { taskData });
});
app.get("/task2", (req, res) => {
  res.render("task2");
});


app.listen(3000, () => {
  console.log(`server started at http://localhost:${port}`);
});

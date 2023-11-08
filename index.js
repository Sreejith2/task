const express = require('express');
const app = express();
const port = 3000;


app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.json());

app.get("/", (req, res) => {
  const taskData = {
    task1: "https://helloworld-p5of.onrender.com",
    task2: "Sreejith's link-2",
    task3: "Sreejith's link-3"
  };
  res.render("home", { taskData });
});

app.listen(3000, () => {
  console.log(`server started at http://localhost:${port}`);
});

const express = require('express')
const bodyParser = require('body-parser');
const markdownIt = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
}).use(require('markdown-it-table-of-contents'))
  .use(require('markdown-it-footnote'));
const util = require('util');
const fs = require('fs');
var hbs = require('hbs')
var path = require('path');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
const {Link,User} = require('./db');
const grayMatter = require('gray-matter');
const writeFile = util.promisify(fs.writeFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json());





app.get('/', (req, res) => {
    res.render('home')
})
app.get('/task1',(req,res)=>{
    res.render('helloworld')
})
app.get('/task2',(req,res)=>{
    const link = req.hostname+req.originalUrl
    res.render('task2',{link})
})
app.get('/task2/about',(req,res)=>{
    const link = req.hostname+req.originalUrl
    res.render('about',{link})
})
app.get('/task2/contact',(req,res)=>{
    const link = req.hostname+req.originalUrl
    res.render('contact',{link})
})
app.get('/task2/blog',(req,res)=>{
    const link = req.hostname+req.originalUrl
    res.render('blog',{link})
})    

app.get('/task3',(req,res)=>{
    res.render('task3');
})

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
  
    res.render("task3", {
      bmi: bmi.toFixed(2)
    })
  })
  
  app.get('/task4',(req,res)=>{
    res.render('task4');
  });

  app.post("/task4/submit",async (req,res)=>{
    const fullName = req.body.name.trim()
    const names = fullName.split(" ")
    const firstName = names.slice(0, -1).join(' ')
    const lastName = names[names.length-1]
    const dob = req.body.dob;
    const address = req.body.address;
    const pin = req.body.pin;
    const phone = req.body.phone;

    const newUser = new User({
        username:fullName,
        firstName:firstName||fullName,
        lastName:names.length===1?"":lastName,
        dob:dob,
        address:address,
        pincode:pin,
        phone:phone
      });
      try {
        await newUser.save();
        console.log('User data inserted successfully:', newUser)
        res.render("task4")
      } catch (err) {
        console.error('Failed to insert user data: ', err);
      }

  })

app.get('/task4/view', async (req, res) => {
    const users = await User.find();
    const pageCount = Math.ceil(users.length / 10);
    let page = parseInt(req.query.p) || 1;

    if (page > pageCount) {
        page = pageCount;
    }

    const prevPage = (page > 1) ? page - 1 : null;
    const nextPage = (page < pageCount) ? page + 1 : null;

    res.render("task4-view", {
        "page": page,
        "pageCount": pageCount,
        "users": users.slice(page * 10 - 10, page * 10),
        "prevPage": prevPage,
        "nextPage": nextPage
    });
});

function generateShortLink() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let shortLink = '';

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    shortLink += alphabet[randomIndex];
  }
  return shortLink;
}

app.get("/task5",(req,res)=>{
  res.render("task5",{shortLink:""});
})
app.post("/task5/submit",async (req,res)=>{
  const link = req.body.link;
  const protocol=req.protocol;
  const host = req.hostname;
  const existingLink = await Link.findOne({link:link});
  if(existingLink){
    const shortLink = existingLink.slink;
    res.render("task5",{realLink:link,shortLink:`${protocol}://${host}/${shortLink}`})
  }else{
    const shortLink = generateShortLink();
    const newLink = new Link({
        link:link,
        slink:shortLink
    });
    try{
      await newLink.save()
      console.log("New Url saved successfully");
      res.render("task5",{realLink:link,shortLink:`${protocol}://${host}/${shortLink}`})
    }catch(err){
      console.log(err);
    }
  }
})
app.get("/task5/:link",(req,res)=>{
  const link = req.params.link;
  console.log(link);
  res.status(200).redirect(`${link}`);
})
app.get('/task6', (req, res) => {
  const markdownFilePath = path.join(__dirname, 'typography.md');

  fs.readFile(markdownFilePath, 'utf8', (err, fileContent) => {
      if (err) {
          console.error('Error reading the Markdown file:', err);
          res.status(500).send('Internal Server Error');
      } else {
          const { data, content } = grayMatter(fileContent);
          const htmlContent = markdownIt.render(content);

          const finalHtmlOutput = `
               <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${data.title || 'Sreejith-Task6'}</title>
            </head>
            <body>
              <header>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/task6/edit">Edit</a></li>
                </ul>
                <p>${data.description}||'No description'</p>
              </header>
              <main>
                ${htmlContent}
              </main>
            </body>
          </html>
          `;

          res.send(finalHtmlOutput);
      }
  });
});

app.get("/task6/edit",(req,res)=>{
  const markdownFilePath = path.join(__dirname, 'typography.md');
  fs.readFile(markdownFilePath, 'utf8', (err, fileContent) => {
    if (err) {
        console.error('Error reading the Markdown file:', err);
        res.status(500).send('Internal Server Error');
    } else {
        res.render("task6-edit",{Content:fileContent});
    }
  });
});

app.post('/task6/edit', async (req, res) => {
  const markdownFilePath = path.join(__dirname, 'typography.md');

  try {
    const updatedContent = req.body.markdownContent;

    await writeFile(markdownFilePath, updatedContent, 'utf8');

    res.redirect('/task6');
  } catch (error) {
    console.error('Error updating the Markdown file:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(5000, () => {
    console.log("server listening at http://localhost:5000");
});

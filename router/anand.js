var express = require('express');

var router = express.Router();

router.get('/task1', (req, res) => {
    res.render('Anand/helloworld_anand')
})

router.get('/task2', (req, res) => {
    var url = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('Anand/task2home', { url: url,page:"HOME" })
})

router.get('/task2/about', (req, res) => {
    var url = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('Anand/task2home', { url: url,page:"ABOUT" })
})

router.get('/task2/contact', (req, res) => {
    var url = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('Anand/task2home', { url: url,page:"CONTACT" })
})

router.get('/task2/blog', (req, res) => {
    var url = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('Anand/task2home', { url: url,page:"BLOG" })
})


module.exports = router;
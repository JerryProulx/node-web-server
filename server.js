const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});

//redirect to maintenance without using next()
// app.use((req, res, next) => {
//   res.render('maintenance');
// });

//Use middleware before static folder to be sure the middleware will be applied to the public folder

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the home page son'
  });
});

app.get('/about', (req, res) => {
  var name = 'Jerry';
  res.render('about', {
    pageTitle: 'About Page',
    welcomeMessage: 'Welcome to the about page son',
    name: name
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    Error: {
      message: 'Unable to fulfill',
      status: 404
    }
  })
});

app.listen(3000, () => {
  console.log('server listening');
});

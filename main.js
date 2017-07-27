// console.log('Hello World');

//Define packages
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const data = require('./data.js')
const fs = require('fs');
const app = express();

//Define templates
app.engine('mustache', mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache');

//Define how page serves static files
app.use(express.static('public'));

//Define page render behaviour
app.get('/', function(req, res){
    res.render('home',{
      data: data
    })
  });

//Reference form, request body and store into variable, push to data array//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/todo', function(req, res){
  let thing_to_do = req.body;
  data.push(thing_to_do);

  res.render('home', {
    data: data
  })
});


app.listen(3000, function(){
  console.log('The program has started successfully!');
})

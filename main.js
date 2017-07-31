// console.log('Hello World');

//Define packages
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const exphandleBars = require('express-handlebars')
const data = [];
const fs = require('fs');
const app = express();

//Define templates
app.engine('handlebars', exphandleBars());
app.set('views','./views');
app.set('view engine', 'handlebars');

//Reference form, request body and store into variable, push to data array//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Define how page serves static files
app.use(express.static('public'));

//Define completed array
let doneItems = [];

//Define page render behavior
app.get('/', function(req, res){
    res.render('home',{
      data: data,
      complete: doneItems
    })
    console.log(data);
  });

app.post('/', function(req, res){
  let thing_to_do = req.body.task;
  data.push(thing_to_do);
  res.redirect('/');
});

app.get('/complete/:index', function(req, res){
  let thingsDone = data.splice(req.params.index, 1);
  doneItems.push(thingsDone)
  console.log(doneItems)
  res.redirect('/')
});

app.listen(3000, function(){
  console.log('The program has started successfully!');
})

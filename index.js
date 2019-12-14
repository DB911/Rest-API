const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

//initialise routes
app.use('/api', require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next)
{
  //console.log(err);
  res.status(422).send({error: err.message});
});

app.get('/api', function(req, res)
{
  console.log('GET Request');
  res.send({name: 'Yoshi'});
});


//listen for requests in processs environment port or port 4000
app.listen(process.env.port || 4000, function()
{
  console.log('Now Listening for Requests');
});

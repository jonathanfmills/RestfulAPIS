const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

console.log(process.env.ENV);
if (process.env.ENV === 'Test') {
  console.log('test');
  mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
  console.log('not test');
  mongoose.connect('mongodb://localhost/bookAPITest');
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;

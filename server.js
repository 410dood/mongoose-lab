// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////


//require express in our app
var express = require('express'),
bodyParser = require('body-parser');
models = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//initialize variable to use for our environment port
var port = 3000;



////////////////////
//  DATA
///////////////////

var books = [
  {
    _id: 15,
    title: "The Four Hour Workweek",
    author: "Tim Ferriss",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
    release_date: "April 1, 2007"
  },
  {
    _id: 16,
    title: "Of Mice and Men",
    author: "John Steinbeck",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
    release_date: "Unknown 1937"
  },
  {
    _id: 17,
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
    release_date: "Unknown 1597"
  }
];


var newBookUUID = 18;







////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  models.Book.find(function (err, books) {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id = 5ad5119c2400b4093972068a
  models.Book.findOne(
    {_id: req.params.id },
     function (err, books) {
      if (err) {
        console.log("index error: " + err);
        res.sendStatus(500);
    }
    res.json(books);
  })
});

// delete book
app.delete('/api/books/:id', function (req, res) {

  models.Book.findOneAndRemove({ _id: req.params.id }, function (err, books) {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(books);
  })
});

// create new book
app.post('/api/books', function (req, res) {
  //create new book with form data ('req.body')
  console.log('books create', req.body);
  models.Book.create(newBook);
  var newBook = req.body;
  db.book.create(newBook, function(err, myBrandNewBookDocument){
//this callback is called when the newdocument has been saves with no errors
    if (err) {
      console.log("errrrrrrrorrrrrr");
      res.sendStatus(500)
    } else {
      res.json(myBrandNewBookDocument)
    }
  })
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  var bookId = req.params.id;
  // find the index of the book we want to remove
  var deleteBookIndex = books.findIndex(function(element, index) {
    return (element._id === parseInt(req.params.id)); //params are strings
  });
  console.log('deleting book with index', deleteBookIndex);
  var bookToDelete = books[deleteBookIndex];
  books.splice(deleteBookIndex, 1);
  res.json(bookToDelete);
});


app.listen(port, ()=> {
  console.log(`App is locked and loaded on ${port}`);
});

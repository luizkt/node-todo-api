var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    var todo = new Todo({
        text: request.body.text
    });
    
    todo.save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send(error);
    });
});

app.listen(3000, () => {
    console.log('Started server on port 3000');
});




// var newUser = new User({
//     name: 'Luiz',
//     email: 'bla@yahoo.com'
// });

// newUser.save().then((doc) => {
//     console.log('Saved user: \n', doc);
// }, (error) => {
//     console.log('Unable to save user: ', error.message);
// });
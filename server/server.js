var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

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

app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({todos});
    }, (error) => {
        response.status(400).send(error);
    });

});

app.get('/todos/:id', (request, response) => {
    var id = request.params.id;

    if (!ObjectID.isValid(id)){;
        return response.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo){
            return response.status(404).send();
        }
        response.send({todo});
    }).catch((error) => {
        response.status(400).send(error);
    });

});

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});

module.exports = { app };


// var newUser = new User({
//     name: 'Luiz',
//     email: 'bla@yahoo.com'
// });

// newUser.save().then((doc) => {
//     console.log('Saved user: \n', doc);
// }, (error) => {
//     console.log('Unable to save user: ', error.message);
// });
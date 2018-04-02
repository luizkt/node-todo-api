var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:password@172.17.0.2:27017/TodoApp?authSource=admin').then(() => {
    console.log('Successfully connected to database.');
}, (error) => {
    console.log('Unable to set connection to database.\n', error);
});

var Todo = mongoose.model('Todo', {
    text: { 
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({
    text: 'Walk the dog'
});

newTodo.save().then((doc) => {
    console.log('Saved todo.', doc);
}, (error) => {
    console.log('Unable to save todo: ', error.message);
});

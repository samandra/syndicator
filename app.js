var mongoq = require("mongoq");

var owl = mongoq('mongodb://testo:testo@dharma.mongohq.com:10056/owl');
var testCollection = owl.collection('testCollection');
var todos = owl.collection('todos');

testCollection.count()
.done(function(num, user, msgs){
	console.log('num : ',num);
});

var express = require('express');
var app = express();

app.use(express.bodyParser()); // Automatically parse JSON in POST requests
app.use(express.static(__dirname + '/public')); // Serve static files from public (e.g http://localhost:8080/index.html)
app.use(express.errorHandler({dumpExceptions: true, showStack: true})); // Dump errors

app.post('/api/todos', function(req, res) {
    var todo = req.body;
    todo.id = Date.now().toString(); // You probably want to swap this for something like https://github.com/dylang/shortid
 
    db.collection('todos').insert(todo, {safe: true}).done(function(todo) {
        res.json(todo, 201);
    });
});
 
app.get('/api/todos', function(req, res) {
    db.collection('todos').find().skip(req.query.skip || 0).limit(req.query.limit || 0).toArray().done(function(todos) {
        res.json(todos);
    });
});

app.get('/api/todos/:id', function(req, res) {
    db.collection('todos').findOne({id: req.params.id}).done(function(todo) {
        res.json(todo);
    });
});
 
app.put('/api/todos/:id', function(req, res) {
    var score = req.body;
 
    db.collection('todos').update({id: req.params.id}, {$set: todo}, {safe: true}).done(function(success) {
        res.json(success ? 200 : 404);
    });
});

app.del('/api/todos/:id', function(req, res) {
    db.collection('todos').remove({id: req.params.id}, {safe: true}).done(function(success) {
        res.json(success ? 200 : 404);
    });
});

app.listen(80);
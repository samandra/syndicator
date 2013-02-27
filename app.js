var mongoq = require("mongoq");

var owl = mongoq('mongodb://testo:testo@dharma.mongohq.com:10056/owl');
var testCollection = owl.collection('testCollection');

testCollection.count()

.done(function(num, user, msgs){
	console.log('num : ',num);
});


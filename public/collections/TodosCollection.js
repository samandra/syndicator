var TodosCollection = Backbone.Collection.extend({

	url : "/api/todos",
	model : TodoModel
});
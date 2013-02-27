var TodoModel = Backbone.Model.extend({

	url: "/api/todo",

	defaults : {
		title : "title"
	}

});
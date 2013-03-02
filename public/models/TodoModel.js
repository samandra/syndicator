var TodoModel = Backbone.Model.extend({

    url: "/api/todos/",

	defaults : {

		title : "title"
	}

});
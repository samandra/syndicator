var TodoModel = Backbone.Model.extend({

    urlRoot: "/api/todos/",

	defaults : {

		title : "title"
	}

});
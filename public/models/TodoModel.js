var TodoModel = Backbone.Model.extend({

	urlRoot: "/api/todos/",

	//url: function(){
    //    return "/api/todos/" + this.id || "";
    //},

	defaults : {
		title : "title"
	}

});
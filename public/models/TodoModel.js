var TodoModel = Backbone.Model.extend({

    id: 67,
	url: function(){
        return "/api/todos/" + this.id || "";
    },

	defaults : {
		title : "title"
	}

});
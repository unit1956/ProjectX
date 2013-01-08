var Transaction = Backbone.Model.extend({

	defaults: {
		'title': 'Default transaction title',
		'date': (new Date()).getTime(),
		'amount': 0,
		'reconciled': false,
		'recuring': false
	}

});

var Transaction = Backbone.Model.extend({

	defaults: {
		'title': 'Default title',
		'amount': 0,
		'date': (new Date()).getTime(),
		'reconciled': false
	}

});

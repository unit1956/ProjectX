var Transaction = Backbone.Model.extend({

	defaults: function() {

		return {
			'title': 'Default title',
			'date': (new Date()).getTime(),
			'amount': 0,
			'reconciled': false,
			'recuring': false
		};

	}

});

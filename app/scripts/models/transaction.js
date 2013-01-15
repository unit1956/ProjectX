var Transaction = Backbone.Model.extend({

	defaults: function() {

		return {
			'title': 'Title',
			'date': (new Date()).getTime(),
			'amount': 0,
			'reconciled': false,
			'recuring': false
		};

	},

	toggleReconciled: function()
	{
		if(this.get('reconciled') === true)
		{
			this.unreconcile();
		}
		else
		{
			this.reconcile();
		}
	},

	reconcile: function()
	{
		this.set('reconciled', true);
	},

	unreconcile: function()
	{
		this.set('reconciled', false);
	}

});

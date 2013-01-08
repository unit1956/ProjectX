var Account = Backbone.Model.extend({

	defaults: {
		'name': 'Default account name',
		'currency': '£',
		'initialBalance': 0,
		'reconciledBalance': 0,
		'availableBalance': 0,
		'monthEnd': null,
		'transactions': new TransactionCollection()
	}

});

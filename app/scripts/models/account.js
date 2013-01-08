var Account = Backbone.Model.extend({

	defaults: function() {

		return {
			'name': 'Default account name',
			'currency': '£',
			'initialBalance': 1000,
			'reconciledBalance': 0,
			'availableBalance': 0,
			'monthEnd': null,
			'transactions': new TransactionCollection()
		};

	},

	initialize: function()
	{
		this.set('reconciledBalance', this.get('initialBalance'));
		this.set('availableBalance', this.get('initialBalance'));
	},

	addTransaction: function(aoTransaction)
	{
		this.get('transactions').add(aoTransaction);

		this.updateReconciledBalance();
		this.updateAvailableBalance();
	},

	transactionChanged: function(aoTransaction)
	{
		this.updateReconciledBalance();
	},

	transactionRemoved: function(aoTransaction)
	{
		this.updateReconciledBalance();
		this.updateAvailableBalance();
	},

	updateAvailableBalance: function()
	{
		var transactionsSum = this.get('transactions').pluck('amount').sum();
		this.set('availableBalance', this.get('initialBalance') + transactionsSum);
	},

	updateReconciledBalance: function()
	{
		var reconciledTransactionsSum = this.get('transactions').where({'reconciled': true}).map(function(aoTransaction){
			return aoTransaction.get('amount');
		}).sum();

		this.set('reconciledBalance', this.get('initialBalance') + reconciledTransactionsSum);
	}

});

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
		this.accountTransactions = this.get('transactions');

		this.attach();

		this.set('reconciledBalance', this.get('initialBalance'));
		this.set('availableBalance', this.get('initialBalance'));
	},

	attach: function()
	{
		// Transaction events
		this.listenTo(this.accountTransactions, 'add', this.transactionAdded);
		this.listenTo(this.accountTransactions, 'change', this.transactionChanged);
		this.listenTo(this.accountTransactions, 'remove', this.transactionRemoved);
	},

	addTransaction: function(aoTransaction)
	{
		this.accountTransactions.add(aoTransaction);
	},

	transactionAdded: function()
	{
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
		var transactionsSum = this.accountTransactions.pluck('amount').sum();
		this.set('availableBalance', (this.get('initialBalance') + transactionsSum).toFixed(2) );
	},

	updateReconciledBalance: function()
	{
		var reconciledTransactionsSum = this.accountTransactions.where({'reconciled': true}).map(function(aoTransaction){
			return aoTransaction.get('amount');
		}).sum();

		this.set('reconciledBalance', (this.get('initialBalance') + reconciledTransactionsSum).toFixed(2) );
	}

});

var AppView = Backbone.View.extend({

	el: '#app',

	events: {
		'click .add-transaction': 'addTransaction'
	},

	initialize: function() {

		this.account = new Account();
		this.accountTransactions = this.account.get('transactions');

		this.accountTransactions.on('add', this.transactionAdded);
	},

	addTransaction: function() {
		this.accountTransactions.add(new Transaction());
	},

	transactionAdded: function(aoTransaction) {
		var tv = new TransactionView({model: aoTransaction});
		$('.transaction-list').append( tv.render().el );
	}

});

var AppView = Backbone.View.extend({

	el: '#app',

	events: {
		'click .add-transaction': 'addTransaction'
	},

	initialize: function() {

		this.account = new Account();
		this.accountTransactions = this.account.get('transactions');

		this.listenTo(this.accountTransactions, 'add', this.transactionAdded);
		this.listenTo(this.accountTransactions, 'change', this.transactionChanged);
	},

	addTransaction: function() {
		this.accountTransactions.add( new Transaction({amount: getRandomInt(5, 50)}) );
	},

	transactionAdded: function(aoTransaction) {
		var tv = new TransactionView({model: aoTransaction});
		this.$('.transaction-list').append( tv.render(aoTransaction.cid, this.account.get('currency')).el );
	},

	transactionChanged: function(aoTransaction) {
		var tv = new TransactionView({model: aoTransaction});
		this.$('[data-cid=' + aoTransaction.cid + ']').replaceWith( tv.render(aoTransaction.cid, this.account.get('currency')).el );
	}

});

var AccountView = Backbone.View.extend({

	el: '#account',

	template: _.template( $('#screen-template').html() ),

	initialize: function()
	{
		this.accountTransactions = this.model.get('transactions');

		// Account events
		this.listenTo(this.model, 'change', this.render);

		// Transaction events
		this.listenTo(this.accountTransactions, 'add', this.transactionAdded);
		this.listenTo(this.accountTransactions, 'change', this.transactionChanged);
		this.listenTo(this.accountTransactions, 'remove', this.transactionRemoved);

		this.render();
	},

	render: function()
	{
		this.$('.screen').html(this.template(this.model.toJSON()));
	},

	transactionAdded: function(aoTransaction)
	{
		var tv = new TransactionView({ model: aoTransaction });
		this.$('.transaction-list').append( tv.render(aoTransaction.cid, this.model.get('currency')).el );
	},

	transactionChanged: function(aoTransaction)
	{
		var tv = new TransactionView({ model: aoTransaction });
		this.$('[data-cid=' + aoTransaction.cid + ']').replaceWith( tv.render(aoTransaction.cid, this.model.get('currency')).el );

		this.model.transactionChanged(aoTransaction);
	},

	transactionRemoved: function(aoTransaction)
	{
		this.model.transactionRemoved(aoTransaction);
	}

});

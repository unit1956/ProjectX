var AccountView = Backbone.View.extend({

	tagName: 'div',

	className: 'account',

	template: _.template( $('#account-template').html() ),
	templateScreen: _.template( $('#screen-template').html() ),

	events: {
		'click .add-transaction': 'addTransaction'
	},

	initialize: function()
	{
		this.accountTransactions = this.model.get('transactions');

		this.attach();

		this.render();

		for(var i=0; i<5; i++)
		{
			this.addTransaction();
		}
	},

	attach: function()
	{
		// Account events
		this.listenTo(this.model, 'change:reconciledBalance change:availableBalance', this.renderScreen);

		// Transaction events
		this.listenTo(this.accountTransactions, 'add', this.transactionAdded);
		this.listenTo(this.accountTransactions, 'change', this.transactionChanged);
	},

	render: function()
	{
		this.$el.html(this.template(this.model.toJSON()));

		this.renderScreen();

		return this;
	},

	renderScreen: function()
	{
		this.$('.screen').html(this.templateScreen(this.model.toJSON()));
	},

	addTransaction: function()
	{
		var t = new Transaction({ amount: getRandomInt(-50, 50), reconciled: getRandomInt(0, 1) ? true : false });
		this.model.addTransaction(t);
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
	}

});

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

		this.model.addTransaction(new Transaction({ amount: -23.31, title: "Waitrose", date: moment().subtract('months', 5).add('days', 8).toDate().getTime(), reconciled: true }));
		this.model.addTransaction(new Transaction({ amount: -1083.33, title: "Rent", date: moment().subtract('months', 3).subtract('days', 5).toDate().getTime() }));
		this.model.addTransaction(new Transaction({ amount: 2857.54, title: "R/GA", date: moment().subtract('days', 1).toDate().getTime() }));
		this.model.addTransaction(new Transaction({ amount: -5.50, title: "Gail's", reconciled: true }));
		this.model.addTransaction(new Transaction({ amount: -0.89, title: "App Store", date: moment().add('days', 3).toDate().getTime() }));
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

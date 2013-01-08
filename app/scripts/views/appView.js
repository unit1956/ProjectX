var AppView = Backbone.View.extend({

	el: '#app',

	events: {
		'click .add-transaction': 'addTransaction'
	},

	initialize: function()
	{
		this.account = new Account();
		this.accountView = new AccountView({ model: this.account });
	},

	addTransaction: function()
	{
		var t = new Transaction({ amount: getRandomInt(-50, -5) });
		this.account.addTransaction(t);
	}

});

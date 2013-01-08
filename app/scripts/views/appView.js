var AppView = Backbone.View.extend({

	el: '#app',

	events: {
		'click .add-transaction': 'addTransaction'
	},

	initialize: function()
	{
		this.account = new Account();
		this.accountView = new AccountView({ model: this.account });

		for(var i=0; i<5; i++)
		{
			this.addTransaction();
		}
	},

	addTransaction: function()
	{
		var t = new Transaction({ amount: getRandomInt(-50, 50), reconciled: getRandomInt(0, 1) ? true : false });
		this.account.addTransaction(t);
	}

});

var AppView = Backbone.View.extend({

	el: '#app',

	initialize: function()
	{
		this.account = new Account();
		this.accountView = new AccountView({ model: this.account });
	}

});

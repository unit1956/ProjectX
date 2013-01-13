var TransactionView = Backbone.View.extend({

	tagName: 'li',

	className: 'transaction',

	template: _.template( $('#transaction-template').html() ),

	events: {
		'click .reconcile-transaction': 'toggleReconciled',
		'click .remove-transaction': 'removeTransaction'
	},

	render: function(asId, asCurrency)
	{
		var data = this.model.toJSON();
		data.currency = asCurrency;
		data.date = moment(data.date).format('MMM D');
		data.absoluteAmount = Math.abs(data.amount);

		this.$el.html(this.template(data));
		this.$el.attr('data-cid', asId);
		this.$el.toggleClass('reconciled', this.model.get('reconciled'));
		this.$el.addClass(this.model.get('amount') > 0 ? 'credit' : 'debit');

		return this;
	},

	toggleReconciled: function()
	{
		this.model.set('reconciled', this.$('.reconcile-transaction').attr('checked') == 'checked' ? true : false);
	},

	removeTransaction: function()
	{
		this.model.destroy();
		this.remove();
	}

});

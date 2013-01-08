var TransactionView = Backbone.View.extend({

	tagName: 'li',

	className: 'transaction',

	template: _.template( $('#transaction-template').html() ),

	events: {
		'click .reconcile': 'toggleReconciled',
		'click .remove': 'removeTransaction'
	},

	render: function(asId, asCurrency) {
		var data = this.model.toJSON();
		data.currency = asCurrency;

		this.$el.html(this.template(data));
		this.$el.attr('data-cid', asId);
		this.$el.toggleClass('reconciled', this.model.get('reconciled'));
		this.$el.addClass(this.model.get('amount') > 0 ? 'credit' : 'debit');

		return this;
	},

	toggleReconciled: function() {
		this.model.set('reconciled', this.$('.reconcile').attr('checked') == 'checked' ? true : false);
	},

	removeTransaction: function() {
		this.model.destroy();
		this.remove();
	}

});

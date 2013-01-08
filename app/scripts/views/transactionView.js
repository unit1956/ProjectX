var TransactionView = Backbone.View.extend({

	tagName: 'li',

	className: 'transaction',

	template: _.template( $('#transaction-template').html() ),

	events: {
		'click .reconcile': 'toggleReconciled',
		'click .delete': 'deleteTransaction'
	},

	render: function(asId, asCurrency) {
		var data = this.model.toJSON();
		data.currency = asCurrency;

		this.$el.html(this.template(data));
		this.$el.attr('data-cid', asId);
		this.$el.toggleClass('reconciled', this.model.get('reconciled'));
		return this;
	},

	toggleReconciled: function() {
		this.model.set('reconciled', this.$('.reconcile').attr('checked') == 'checked' ? true : false);
	},

	deleteTransaction: function() {
		this.model.destroy();
		this.remove();
	}

});

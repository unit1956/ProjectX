var TransactionView = Backbone.View.extend({

	tagName: 'li',

	className: 'transaction',

	template: _.template( $('#transaction-template').html() ),

	events: {
		'click .reconcile': 'toggleReconciled'
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.toggleClass('reconciled', this.model.get('reconciled'));
		return this;
	},

	toggleReconciled: function() {
		this.model.set('reconciled', this.$('.reconcile').attr('checked'));
	}

});

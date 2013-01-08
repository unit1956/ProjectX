var TransactionView = Backbone.View.extend({

	tagName: 'li',

	className: 'transaction',

	template: _.template( $('#transaction-template').html() ),

	events: {
		//'click .reconcile': 'toggleReconciled'
	},

	initialize: function() {
		//this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},

	toggleReconciled: function() {
		this.model.toggleReconciled( this.$('.reconcile').attr('checked') );
	}

});

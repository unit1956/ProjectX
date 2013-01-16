var TransactionView = Backbone.View.extend({

	tagName: 'li',

	className: 'transaction',

	template: _.template( $('#transaction-template').html() ),

	events: {
		'click .reconcile-transaction': 'toggleReconciled',
		'click .remove-transaction': 'removeTransaction',
		'click': 'toggleReconciled'
	},

	initialize: function()
	{
		this.attach();
	},

	attach: function()
	{
		this.$el.on('touchstart', _.bind(this.onTouchStart, this));
		this.$el.on('touchmove', _.bind(this.onTouchMove, this));
		this.$el.on('touchend', _.bind(this.onTouchEnd, this));

		this.listenTo(this.model, 'change:reconciled', this.transactionReconciledChanged);
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

	transactionReconciledChanged: function(aoModel, abValue)
	{
		var status = this.$('.transaction-status');

		if(abValue)
		{
			this.$el.addClass('reconciled');
			status.addClass('feedback-reconciled');
			setTimeout(function(){ status.removeClass('feedback-reconciled'); }, 200);
		}
		else
		{
			this.$el.removeClass('reconciled');
			status.addClass('feedback-unreconciled');
			setTimeout(function(){ status.removeClass('feedback-unreconciled'); }, 200);
		}
	},

	toggleReconciled: function()
	{
		this.model.toggleReconciled();
	},

	removeTransaction: function()
	{
		this.model.destroy();
		this.remove();
	},

	onTouchStart: function(aeEvent)
	{
		//aeEvent.preventDefault();

		this.touchStartX = aeEvent.originalEvent.targetTouches[0].pageX;
	},

	onTouchMove: function(aeEvent)
	{
		//aeEvent.preventDefault();

		var curX = aeEvent.originalEvent.targetTouches[0].pageX - this.touchStartX;

		this.$el.css('webkit-transform', 'translate3d(' + curX + 'px, 0, 0)');
	},

	onTouchEnd: function(aeEvent)
	{
		this.$el.css('webkit-transform', 'translate3d(0, 0, 0)');
	}

});

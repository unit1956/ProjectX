var TransactionView = Backbone.View.extend({

	tagName: 'li',

	className: 'transaction',

	template: _.template( $('#transaction-template').html() ),

	events: {
		'click .remove-transaction': 'removeTransaction'
	},

	initialize: function()
	{
		this.attach();

		this.options = {
			dragThresholdX: 30,
			dragThresholdY: 30
		};
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

	removeTransaction: function()
	{
		this.model.destroy();
		this.remove();
	},

	onTouchStart: function(aeEvent)
	{
		var e = aeEvent.originalEvent;

		this.touchStartX = e.targetTouches[0].pageX;
		this.touchStartY = e.targetTouches[0].pageY;
	},

	onTouchMove: function(aeEvent)
	{
		var e = aeEvent.originalEvent;

		this.curX = e.targetTouches[0].pageX - this.touchStartX;
		this.curY = e.targetTouches[0].pageY - this.touchStartY;

		this.tx = this.curX + this.options.dragThresholdX * (this.curX < 0 ? 1 : -1);

		if( Math.abs(this.curX) > this.options.dragThresholdX &&
			Math.abs(this.curY) < this.options.dragThresholdY )
		{
			aeEvent.preventDefault();
			this.$el.css('webkit-transform', 'translate3d(' + this.tx + 'px, 0, 0)');
		}
	},

	onTouchEnd: function(aeEvent)
	{
		var e = aeEvent.originalEvent;

		if(Math.abs(this.tx) > 50)
		{
			this.tx = 0;
			this.model.toggleReconciled();
		}

		this.$el.css('webkit-transform', 'translate3d(0, 0, 0)');
	}

});

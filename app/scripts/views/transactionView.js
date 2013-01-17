var TransactionView = Backbone.View.extend({

	tagName: 'li',

	className: 'transaction',

	template: _.template( $('#transaction-template').html() ),

	events: {
		'click .reconcile-transaction': 'toggleReconciled',
		'click .remove-transaction': 'removeTransaction'
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
		var e = aeEvent.originalEvent;

		this.moved = false;

		//aeEvent.preventDefault();

		this.touchStartX = e.targetTouches[0].pageX;
		this.touchStartY = e.targetTouches[0].pageY;

		this.gestureTwoFingersTouch = e.targetTouches.length == 2;
		this.gestureSwipe = e.targetTouches.length == 1;
	},

	onTouchMove: function(aeEvent)
	{
		var e = aeEvent.originalEvent;

		this.moved = true;

		this.curX = e.targetTouches[0].pageX - this.touchStartX;
		this.curY = e.targetTouches[0].pageY - this.touchStartY;

		if(Math.abs(this.curX) > 20 && Math.abs(this.curY) < 50)
		{
			this.$el.css('webkit-transform', 'translate3d(' + this.curX + 'px, 0, 0)');
		}

		this.gestureTwoFingersTouch = false;
		this.gestureSwipe = e.touches.length <= 1 && Math.abs(this.curX) > 50 && Math.abs(this.curY) < 20;
	},

	onTouchEnd: function(aeEvent)
	{
		var e = aeEvent.originalEvent;

		this.gestureSwipe = this.gestureSwipe && this.moved && e.touches.length <= 1;


		if(this.gestureTwoFingersTouch)
		{
			console.log('Gesture: 2 finger touch!');
		}
		this.gestureTwoFingersTouch = false;


		if(this.gestureSwipe)
		{
			console.log('Gesture: horizontal swipe');
		}
		this.gestureSwipe = false;

		this.$el.css('webkit-transform', 'translate3d(0, 0, 0)');
	}

});

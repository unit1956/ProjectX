

moment.calendar = {
    lastDay : '[Yesterday]',
    sameDay : '[Today]',
    nextDay : '[Tomorrow]',
    lastWeek : '[last] dddd',
    nextWeek : 'dddd',
    sameElse : 'L'
};

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var appView;

$(document).ready(function(){

	appView = new AppView();

});

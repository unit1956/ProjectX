
$(document).ready(function(){

	var t = new Transaction();
	var a = new Account();

	a.on('add', function(aoTransaction){

		console.log(aoTransaction.get('title'));

	});


	a.add(t);

});

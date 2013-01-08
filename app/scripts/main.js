
$(document).ready(function(){

	var transaction = new Transaction();
	var account = new Account();
	var accountTransactions = account.get('transactions');

	accountTransactions.on('add', function(aoTransaction){
		console.log(aoTransaction.get('title'));
	});

	console.log(account.get('name'));

	accountTransactions.add(transaction);

});

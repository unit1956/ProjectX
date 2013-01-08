

// To get the sum value in an array of numbers
//
Array.prototype.sum = function() {
	var value = 0;
	for(var i=0; i<this.length; i++)
	{
		value += this[i];
	}
	return value;
};

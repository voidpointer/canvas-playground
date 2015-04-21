
/*
*	This class is useful when you need to be able to set the random seed
*/

var Random = function(seed) {
	if (typeof seed == 'undefined') {
		this.seed = Math.random();
	} else {
		this.seed = seed;
	}
};

Random.prototype = {
	setRandomSeed: function(seed) {
		this.seed = seed;
	},	
	random: function() {
		// From http://stackoverflow.com/questions/521295/javascript-random-seeds
		var x = Math.sin(this.seed++) * 10000;
		return x - Math.floor(x);
	}
}
(function (custom) {
	custom.getCustomTo = function (source) {
		var to = 'civan.cim@gmail.com';
		
		//make this from database
		if (source === 'Francoal') {
			to = 'pedroafranco@francoal.com.co, pedrojfranco@francoal.com.co, andreafranco@francoal.com.co';
		}

		return to;
	};

})(module.exports);
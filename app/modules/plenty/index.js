(function (plenty) {
	//public methods	
	plenty.extend = extend;
	
	//private members
	
	//extends an object and returns a copy
	function extend(obj, source) {
		for (var prop in source) {
			if (obj.hasOwnProperty(prop)) {
				obj[prop] = source[prop];
			}
		}
		return obj;
	}

})(module.exports);
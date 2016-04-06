(function (allowedDomains) {
	var data = require('../data'),
		env = process.env.NODE_ENV;


	allowedDomains.isAllowed = isAllowed;

	function isAllowed(hostname, next) {
		if(env === 'development') {
			next(null, true);
			return;
		}
		
		if (hostname) {
			data.domains.getByHostname(hostname, function (err, domain) {
				if (!err && domain) {
					next(null, true);
				} else {
					next(null, false);
				}
			});
		} else {
			next(null, true);
		}

	}

})(module.exports);

(function (domains) {
	var database = require('./database');
	
	domains.getByHostname = getByHostname;

	function getByHostname(hostname, next) {
		database.getDb(function (err, db) {
			if (err) {
				next(err);
			} else {
				db.domains.findOne({ hostname: hostname }, next);
			}
		});
	}

})(module.exports);
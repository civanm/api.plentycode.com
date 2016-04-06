(function (database) {
	var mongodb = require('mongodb'),
		mongoUrl =  process.env.MONGOLAB_URI || 'mongodb://localhost:27017/plentycode',
		plentycodeDb = null;

	database.getDb = function getDb(next) {
		if (!plentycodeDb) {
			//connects to the database
			mongodb.MongoClient.connect(mongoUrl, function (err, db) {
				if (err) {
					next(err);
				} else {
					//returns the db into a wrapper object incase we need to extend it
					plentycodeDb = {
						db: db,
						people: db.collection('people'),
						emails: db.collection('emails'),
						users: db.collection('users'),
						customers: db.collection('customers'),
						domains: db.collection('domains')
					};

					next(null, plentycodeDb);
				}
			});
		} else {
			next(null, plentycodeDb);
		}
	};

})(module.exports);
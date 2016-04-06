(function (controllers) {
	var cors = require('./cors'),
		home = require("./home"),
		people = require('./people'),
		email = require('./email'),
		auth = require('./auth');

	controllers.init = function (app) {
		app.use(cors.allowAll); //allow cors for all domains
		
		//initialize the controllers
		home.init(app);
		people.init(app);
		email.init(app);
		auth.init(app);
	};
})(module.exports);

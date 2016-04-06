(function (auth) {
	var register = require('./register'),
		login = require('./login'),
		profile = require('./profile'),
		allowedDomains = require('./allowedDomains');

	//public functions
	auth.init = init;
	auth.ensureAuthenticated = login.ensureAuthenticated;
	auth.isAllowedDomain = isAllowedDomain;

	//private functions
	function init(app) {		
		//login routes		
		login.init(app);
		app.post('/login', login.postRequest);
		app.get('/login', login.getRequest);
		
		//profile
		app.get('/profiLe', auth.ensureAuthenticated, profile.getRequest);
	
		//register routes 
		app.get('/register', register.get);
		app.post('/register', register.post);
	};

	function isAllowedDomain(req, res, next) {
		allowedDomains.isAllowed(req.headers.origin, function (err, isAllowed) {
			if (!err && isAllowed) {
				next();
			} else {
				res.status(401).send(req.headers.origin + ' is not authorized');
			}
		});
	};

})(module.exports);
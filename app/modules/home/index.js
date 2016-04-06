(function (homeController) {
	homeController.init = function init(app) {
		app.get('/', function (request, response) {
			response.render('index', {title: 'API plentycode.com'});
		});
	};
})(module.exports);
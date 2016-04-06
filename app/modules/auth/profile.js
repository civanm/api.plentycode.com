(function (profile) {
	profile.getRequest = getRequest;

	function getRequest(req, res) {
		res.send({ profile: 'profile' });
	}
})(exports);
const protect = (re, res, next) => {
	const { user } = req.session;

	if (!user) {
		return res
			.status(400)
			.json({ status: "fail", message: "Unauthorized" });
	}

	req.user = user;

	next();
};

module.exports = protect;

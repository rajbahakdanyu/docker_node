const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const hashpassword = await bcrypt.hash(password, 12);
		const newUser = await User.create({
			username: username,
			password: hashpassword,
		});

		req.session.user = newUser;
		res.status(201).json({
			status: "success",
			data: {
				newUser,
			},
		});
	} catch (e) {
		console.log(e);
		res.status(400).json({
			status: "error",
		});
	}
};

exports.login = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({
			username,
		});

		if (!user) {
			return res.status(400).json({
				status: "error",
				message: "User not found",
			});
		}

		const isCorrect = await bcrypt.compare(password, user.password);

		if (isCorrect) {
			req.session.user = user;
			return res.status(200).json({
				status: "success",
			});
		} else {
			return res.status(400).json({
				status: "error",
				message: "Username or password is incorrect",
			});
		}
	} catch (e) {
		console.log(e);
		res.status(400).json({
			status: "error",
		});
	}
};

import { logger } from "../utils/winston/index.js";
import User from "../schema/user.schema.js";
import { signUpEmail } from "../utils/mail.js";

export const signUp = async (req, res) => {
	const newUser = new User(req.body);
	newUser.photo = req.file.filename;
	newUser.cart = [];
	signUpEmail(newUser);
	try {
		await newUser.save();
		res.redirect("/login");
	} catch (error) {
		logger.error(`Error al registrar usuario. ${error}`);
	}
};

export const login = (req, res) => {
	res.render("login");
};

export const profile = (req, res) => {
	const user = req.user;
	res.render("profile", { user });
};

export const logout = (req, res, next) => {
	const name = req.session.name;
	logger.log("info", `name: ${name}`);
	req.logout();
	res.render("logout", { name });
};

export const loginError = (req, res) => {
	res.render("login-error");
};

export const signupGet = (req, res) => {
	res.render("signup");
};

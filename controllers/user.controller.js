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

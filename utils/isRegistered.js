import Users from "../schema/user.schema.js";

const isRegistered = async (req, res, next) => {
	const { email } = req.body;
	const exists = await Users.find({ email: email });
	console.log("exist:", exists);
	if (exists.length) {
		res.render("signup-registered-user");
		return;
	}
	next();
};

export default isRegistered;

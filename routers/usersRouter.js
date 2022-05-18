import { Router } from "express";
import passport from "passport";
import isRegistered from "../utils/isRegistered.js";
import multer from "../utils/multer.js";
import { logger } from "../utils/winston/index.js";
import { isAuth, isNotAuth, isAdmin } from "../utils/auth.js";
import { signUp } from "../controllers/user.controller.js";

const userRouter = Router();

// ------ Register ------

userRouter.post("/signup", multer.single("photo"), isRegistered, signUp);
userRouter.post(
	"/login",
	passport.authenticate("login", {
		failureRedirect: "/login-error",
		successRedirect: "/",
	})
);

// ------ Login ------

userRouter.get("/signup", isNotAuth, (req, res) => {
	res.render("signup");
});

userRouter.get("/login", isNotAuth, (req, res) => {
	res.render("login");
});

userRouter.get("/profile", isAuth, (req, res) => {
	const user = req.user;
	res.render("profile", { user });
});

userRouter.get("/login-error", isNotAuth, (req, res) => {
	res.render("login-error");
});

userRouter.get("/logout", (req, res, next) => {
	const name = req.session.name;
	logger.log("info", `name: ${name}`);
	req.logout();
	res.render("logout", { name });
});

export default userRouter;

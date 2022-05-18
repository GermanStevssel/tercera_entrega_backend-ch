import { Router } from "express";
import { isAuth } from "../utils/auth.js";
import Products from "../schema/products.schema.js";
import { logger } from "../utils/winston/index.js";
import ProductsForIndexDTO from "../dto/productsDTO.js";
import User from "../schema/user.schema.js";

export const webRouter = Router();

webRouter.get("/", isAuth, async (req, res) => {
	const user = req.user;
	try {
		const products = await Products.find({});
		const productsDTO = products.map(
			(product) => new ProductsForIndexDTO(product)
		);
		res.render("index", { user, productsDTO });
	} catch (error) {
		logger.error(`Error al listar productos. ${error}`);
	}
});

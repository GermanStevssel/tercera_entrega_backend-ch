import { isAuth } from "../utils/auth";

app.get("/", isAuth, async (req, res) => {
	const user = req.user;
	try {
		const products = await Products.find({});
		const productsDTO = products.map(
			(product) => new productsForIndexDTO(product)
		);
		res.render("index", { user, productsDTO });
	} catch (error) {
		logger.error(`Error al listar productos. ${error}`);
	}
});

app.get("*", (req, res) =>
	res.status(404).json({
		error: -2,
		description: `ruta ${req.originalUrl} método get no implementado`,
	})
);

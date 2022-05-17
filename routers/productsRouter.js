import { Router } from "express";
import productsDao from "../daos/products/products.daos.js";

const productsRouter = Router();

const productsContainer = productsDao;

let administrador = true;

const authError = (req) => ({
	error: -1,
	description: `Ruta ${req.baseUrl} método ${req.method} no autorizada`,
});

// Endpoints products
productsRouter.get("/", async (req, res) => {
	res.json(await productsContainer.getAll());
});

productsRouter.get("/:id", async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await productsContainer.getById(productId);

		if (!product) {
			return res.status(400).json({ error: "producto no encontrado" });
		}

		res.cookie("id", product._id);
		res.render("product", { product });
	} catch (err) {
		ogger.error(`Error al obtener producto. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
});

productsRouter.post("/", async (req, res) => {
	if (administrador) {
		res.json(await productsContainer.save(req.body));
	} else {
		res.send(authError(req));
	}
});

productsRouter.put("/:id", (req, res) => {
	const productId = req.params.id;
	if (administrador) {
		productsContainer.updateById(productId, {
			...req.body,
		});
		res.send(productsContainer.getById(productId));
	} else {
		res.send(authError(req));
	}
});

productsRouter.delete("/:id", async (req, res) => {
	const productId = req.params.id;
	administrador
		? res.send(await productsContainer.deleteById(productId))
		: res.send(authError);
});

productsRouter.delete("/", async (req, res) => {
	if (administrador) {
		res.send(await productsContainer.deleteAll());
	} else {
		res.send(authError(req));
	}
});

export default productsRouter;

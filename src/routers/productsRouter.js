import { Router } from "express";
import productsDao from "../daos/products/products.daos.js";

export const productsRouter = Router();

const productsContainer = productsDao;

let administrador = true;

const authError = (req) => ({
	error: -1,
	description: `Ruta ${req.baseUrl} método ${req.method} no autorizada`,
});

// Endpoints Videogames
productsRouter.get("/", async (req, res) => {
	res.json(await productsContainer.getAll());
});

productsRouter.get("/:id", async (req, res) => {
	const productId = req.params.id;
	const product = await productsContainer.getById(productId);
	if (product) {
		res.send(product);
	} else {
		res.send({ error: "producto no encontrado" });
	}
});

productsRouter.post("/", async (req, res) => {
	if (administrador) {
		res.json(await productsContainer.saveOne(req.body));
	} else {
		res.send(authError(req));
	}
});

productsRouter.put("/:id", (req, res) => {
	const productId = parseInt(req.params.id);
	if (administrador) {
		productsContainer.updateById(productId, {
			...req.body,
			id: productId,
		});
		res.send(productsContainer.getById(productId));
	} else {
		res.send(authError(req));
	}
});

productsRouter.delete("/:id", (req, res) => {
	const productId = parseInt(req.params.id);
	administrador
		? res.send(productsContainer.deleteById(productId))
		: res.send(authError);
});

productsRouter.delete("/", (req, res) => {
	if (administrador) {
		productsContainer.deleteAll();
		res.send({ result: "Todos los productos han sido eliminados" });
	} else {
		res.send(authError(req));
	}
});

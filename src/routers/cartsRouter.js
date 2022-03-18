import { Router } from "express";
import cartsDao from "../daos/carts/carts.daos.js";
import productsDao from "../daos/products/products.daos.js";

export const cartRouter = Router();

const cartsContainer = cartsDao;
const productsContainer = productsDao;

// Endpoints Cart

cartRouter.get("/", async (req, res) => {
	res.json(await cartsContainer.getAll());
});

cartRouter.get("/:id", async (req, res) => {
	const cartId = req.params.id;
	const cart = await cartsContainer.getById(cartId);

	if (cart) {
		res.json(cart);
	} else {
		res.json({ error: "carrito no encontrado" });
	}
});

cartRouter.get("/:id/productos", async (req, res) => {
	const cartId = parseInt(req.params.id);
	const cart = await cartsContainer.getById(cartId);
	if (cart) {
		const product = await productsContainer.getById(req.body.id);
		cart.productos.push(product);
		await cartsContainer.updateById(cartId, cart);
		res.json(cart);
	} else {
		res.json({ Error: "No existe ese carrito" });
	}
});

cartRouter.post("/", async (req, res) => {
	res.json(await cartsContainer.save(req.body));
});

cartRouter.post("/:id/productos", (req, res) => {
	const cartId = parseInt(req.params.id);

	cartsContainer.addVideogameToCart(cartId, req, res);
});

cartRouter.delete("/:id", (req, res) => {
	const cartId = parseInt(req.params.id);

	cartsContainer.deleteById(cartId, req, res);
});

cartRouter.delete("/:id/productos/:id_prod", (req, res) => {
	const cartId = parseInt(req.params.id);
	const productId = parseInt(req.params.id_prod);

	cartsContainer.deleteVideogameInCartWithId(cartId, productId, req, res);
});

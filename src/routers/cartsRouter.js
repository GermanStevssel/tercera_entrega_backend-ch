import { Router } from "express";
import cartsDao from "../daos/carts/carts.daos.js";

export const cartRouter = Router();

const cartsContainer = cartsDao;

// Endpoints Cart

cartRouter.get("/:id/productos", async (req, res) => {
	const cartId = parseInt(req.params.id);

	cartsContainer.getVideogamesByCartId(cartId, req, res);
});

cartRouter.post("/", (req, res) => {
	cartsContainer.createCart(req, res);
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

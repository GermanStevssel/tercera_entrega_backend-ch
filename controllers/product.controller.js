import productsDao from "../daos/products/products.daos";
import { logger } from "../utils/winston";

const productsContainer = productsDao;

export const getProducts = async (req, res) => {
	try {
		res.json(await productsContainer.getAll());
	} catch (err) {
		logger.error(`Error al listar productos. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const getProduct = async (req, res) => {
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
};

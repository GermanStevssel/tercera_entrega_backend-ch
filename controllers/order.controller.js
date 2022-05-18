import Orders from "../schema/order.schema";
import Products from "../schema/products.schema";
import { logger } from "../utils/winston";
import moment from "moment";
import { checkOutSms, checkOutWhatsapp } from "../utils/sms_wsp";
import { checkOutEmail } from "../utils/mail";

export const checkout = async (req, res) => {
	const user = req.user;

	try {
		const productsInCart = await Promise.all(
			cart.map(async (elem) => {
				const product = await Products.findById(elem.product);
				return {
					product: product.name,
					quantity: elem.quantity,
				};
			})
		);

		const order = new Orders({
			userName: user.name,
			products: productsInCart,
			userEmail: user.email,
			date: moment(new Date().format("DD/MM/YY HH:mm")),
		});
		cart = [];
		checkOutEmail(order);
		checkOutSms(user.phone);
		checkOutWhatsapp(order);
		await user.save();
		await order.save();

		res.redirect("/orderSuccess");
	} catch (err) {
		logger.error(`Error al generar pedido. ${err}`);
		return res.status(500).json({ error_description: "Error del servidor." });
	}
};

export const orderSuccess = async (req, res) => {
	res.render("order-success");
};

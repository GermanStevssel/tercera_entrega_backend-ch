import { createTransport } from "nodemailer";
import config from "../config/index.js";

const TEST_MAIL = "hank.mosciski52@ethereal.email";

const transporter = createTransport({
	host: config.MAIL_ETH_HOST,
	port: config.MAIL_ETH_PORT,
	auth: {
		user: config.MAIL_ETH_USER,
		pass: config.MAIL_ETH_PASS,
	},
});

export const signUpEmail = async (newUser) => {
	const mailOptions = {
		from: "Tercer Entrega",
		to: TEST_MAIL,
		subject: "nuevo registro",
		html: `<h1>Nuevo Usuario</h1>
      <p>Mail: ${newUser.mail}</p>
      <p>Nombre: ${newUser.name}</p>
      <p>Dirección: ${newUser.address}</p>
      <p>Fecha de Nacimiento: ${newUser.birthDate}</p>
      <p>Teléfono: ${newUser.phone}</p>
      `,
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		logger.error(`Error al enviar mail de registro. ${error}`);
	}
};

export const checkOutEMail = async (newOrder) => {
	const mailOptions = {
		from: "Tercer Entrega",
		to: TEST_MAIL,
		subject: `nuevo pedido de ${newOrder.userName}, ${newOrder.userEmail}`,
		html: `<h1>Pedido</h1>
      ${newOrder.products.map(
				(order) => `<li>${order.product}, cantidad: ${order.quantity}</li>`
			)}
      `,
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		logger.error(`Error al enviar mail de pedido. ${error}`);
	}
};

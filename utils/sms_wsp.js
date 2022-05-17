import twilio from "twilio";
import { logger } from "./winston/index.js";

const accountSid = "AC35ecd3af856825d93aba4501fb635217";
const authToken = "648eb30798c42e30056332aa7eca527c";

const client = twilio(accountSid, authToken, {
	lazyLoading: true,
});

export const checkOutSms = async (userPhone) => {
	try {
		const message = await client.messages.create({
			body: "Tu pedido ha sido recibido y se encuentra en proceso!",
			from: "+19894410301",
			to: `+54${userPhone}`,
		});
		logger.log(message);
	} catch (error) {
		logger.log(error);
	}
};
export const checkOutWhatsapp = async (order) => {
	try {
		const message = await client.messages.create({
			body: `nuevo pedido de ${order.userName}, ${order.userEmail}`,
			from: "whatsapp:+14155238886",
			to: "whatsapp:+5492914042820",
		});
		logger.log(message);
	} catch (error) {
		logger.log(`error al enviar whatsapp: ${error}`);
	}
};

import dotenv from "dotenv";
import cartSchema from "../../schema/carts.cartSchema";

dotenv.config();
let cartsDao;

if (`${process.env.DB}` === "firebase") {
	const { default: CartsDaoFirebase } = await import(
		"../../containers/FirebaseContainer"
	);

	cartsDao = new CartsDaoFirebase("carts");
} else {
	const { default: CartsDaoMongo } = await import(
		"../../containers/MongoContainer"
	);

	cartsDao = new CartsDaoMongo("carts", cartSchema);
}

export default cartsDao;

import productSchema from "../../schema/products.schema";

let productsDao;

if (`${process.env.DB}` === "firebase") {
	const { default: ProductsDaoFirebase } = await import(
		"../../containers/FirebaseContainer"
	);

	cartsDao = new ProductsDaoFirebase("carts");
} else {
	const { default: ProductsDaoMongo } = await import(
		"../../containers/MongoContainer"
	);

	productsDao = new ProductsDaoMongo("products", productSchema);
}

export default productsDao;

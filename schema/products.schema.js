import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	id: { type: String, required: true },
	timestamp: { type: String, required: true, max: 1000 },
	name: { type: String, required: true, max: 100 },
	description: { type: String, required: true, max: 100 },
	code: { type: String, required: true },
	photo: { type: String, required: true, max: 100 },
	price: { type: Number, required: true },
	stock: { type: Number, required: true },
});

export default productSchema;
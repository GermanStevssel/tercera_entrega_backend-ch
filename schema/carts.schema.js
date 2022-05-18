import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
	id: { type: String, required: true, max: 100 },
	timestamp: { type: String, required: true, max: 100 },
	products: { type: Array, required: true, max: 100 },
	quantity: { type: Number, require: true, trim: true },
});

export default cartSchema;

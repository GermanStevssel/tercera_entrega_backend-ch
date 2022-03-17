import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	id: { type: String, required: true, max: 100 },
	timestamp: { type: String, required: true, max: 100 },
	nombre: { type: String, required: true, max: 100 },
	descripcion: { type: String, required: true, max: 100 },
	codigo: { type: String, required: true, max: 100 },
	foto: { type: String, required: true, max: 100 },
	precio: { type: Number, required: true, max: 1000000 },
	stock: { type: Number, required: true, max: 1000 },
});

export default productSchema;

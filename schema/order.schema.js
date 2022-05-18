import mongoose from "mongoose";
import { string } from "yargs";

const OrderSchema = mongoose.schema({
	userName: { type: string, require: true, trim: true, min: 4 },
	products: [],
	userEmail: {
		type: String,
		required: true,
		min: 4,
		trim: true,
		lowercase: true,
	},
	date: { type: string, require: true, trim: true },
	state: { type: string, require: true, trim: true },
});

const Orders = mongoose.model("orders", OrderSchema);

export default Orders;

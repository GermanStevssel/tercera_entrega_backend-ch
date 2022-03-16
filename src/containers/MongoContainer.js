import mongoose from "mongoose";
import { config } from "../config.js";

mongoose.connect(`${config.mongodb.url}`);

export default class MongoContainer {
	constructor(schema) {
		this.schema = schema;
		this.object = [];
	}
	getAll() {
		this.schema
			.find({})
			.then((data) => {
				this.object = data;
			})
			.catch((err) => console.log(err));
		return object.length
			? this.object
			: console.log("No hay ningún producto cargado");
	}
	getById(id) {
		this.schema
			.find({ id })
			.then((data) => (this.object = data))
			.catch((err) => console.log(err));

		return object.length ? this.object : console.log("Objeto no encontrado");
	}
	deleteById(id) {
		this.schema
			.deleteOne({ id })
			.then(() => console.log(`El objecto con id: ${id} se ha eliminado`))
			.catch((err) => console.log(err));
	}
	deleteAll() {
		this.schema
			.deleteMany({})
			.then(() => console.log("Se eliminaron todos los objetos"))
			.catch((err) => console.log(err));
	}
	saveOne(object) {
		this.schema
			.create(object) //
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}
	saveMany(objects) {
		if (!objects.length) {
			throw new Error("No existen productos para agregar");
		}

		const normalizedObjects = objects.map((object) => new this.schema(object));

		this.schema
			.insertMany(normalizedObjects)
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}
	updateById(id, object) {
		this.schema
			.updateOne(
				{ id },
				{
					$set: object,
				}
			)
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}
}

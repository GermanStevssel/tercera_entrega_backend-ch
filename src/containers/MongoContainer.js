import mongoose, { model } from "mongoose";
import { config } from "../config.js";

mongoose.connect(`${config.mongodb.url}`);

export default class MongoContainer {
	constructor(collection, schema) {
		this.collection = model(collection, schema);
		this.object = [];
	}
	getAll() {
		this.collection
			.find({})
			.then((data) => {
				this.object = data;
			})
			.catch((err) => console.log(err));
		return this.object.length
			? this.object
			: console.log("No hay nada cargado");
	}

	getById(id) {
		let doc = this.collection.find(id);

		if (!doc) {
			throw new Error(`id ${id} no encontrado`);
		}
		doc.then((data) => (this.object = data)).catch((err) => console.log(err));

		return this.object.length
			? this.object
			: console.log("Objeto no encontrado");
	}

	deleteById(id) {
		this.collection
			.deleteOne({ id })
			.then(() => console.log(`El objeto con id: ${id} se ha eliminado`))
			.catch((err) => console.log(err));
	}
	deleteAll() {
		this.collection
			.deleteMany({})
			.then(() => console.log("Se eliminaron todos los objetos"))
			.catch((err) => console.log(err));
	}
	saveOne(object) {
		object.timestamp = new Date();
		this.collection
			.create(object)
			.then((data) => {
				console.log(data);
				return data;
			})
			.catch((err) => console.log(err));
	}

	updateById(id, object) {
		object.timestamp = new Date();
		this.collection
			.updateOne(
				{ id },
				{
					$set: object,
				}
			)
			.then((data) => console.log(data))
			.catch((err) => console.log(`Error al actualizar: ${err}`));
	}
}

import admin from "firebase-admin";
import { config } from "../config.js";

admin.initializeApp({ credential: admin.credential.cert(config.firebase) });

export default class FirebaseContainer {
	constructor(collection) {
		this.collection = collection;
	}
	getAll = async () => {
		try {
			const results = [];
			const db = admin.firestore();
			const query = db.collection(this.collection);
			const querySnapshot = await query.get();
			querySnapshot.forEach((doc) => {
				results.push({ id: doc.id, ...doc.data() });
			});
			return results;
		} catch (err) {
			console.log(err);
			throw new Error(`Error al intentar obtener todo: ${err}`);
		}
	};
	getById(id) {
		const db = admin.firestore();
		const query = db.collection(this.collection);
		const doc = query.doc(id);
		const item = doc.get();
		if (!item) {
			console.log(`Error al listar por el id: ${id}`);
		}
		item
			.then((data) => {
				const response = data.data();
				console.log(response);
				return { id, ...data };
			})
			.catch((err) => console.log(err));
	}

	deleteById(id) {
		const db = admin.firestore();
		const query = db.collection(this.collection);
		const doc = query.doc(id);
		const item = doc.get();
		item
			.delete()
			.then((data) => console.log(`Se ha eliminado ${data} con el id ${id}`))
			.catch((err) => console.log(err));

		return item;
	}

	async deleteAll() {
		try {
			const docs = await this.listAll();
			const ids = docs.map((doc) => doc.id);
			const deleteDocs = ids.map((id) => this.delete(id));
			await Promise.allSettled(deleteDocs);
		} catch (err) {
			throw new Error(`Error al borrar: ${err}`);
		}
	}

	updateById(id, object) {
		object.timestamp = new Date();
		const db = admin.firestore();
		const query = db.collection(this.collection);
		const doc = query.doc(id);
		if (!doc) {
			console.log(`Error al actualizar el objeto con id: ${id}`);
			throw new Error(`No existe el objeto con id: ${id}`);
		}
		let item = doc.get();
		item
			.update(object)
			.then((data) => console.log(data))
			.catch((err) => {
				console.log(err);
				throw new Error(`Error al actualizar el objeto con id: ${id}`);
			});
	}

	saveOne(object) {
		object.timestamp = new Date();
		const db = admin.firestore();
		const query = db.collection(this.collection);
		const doc = query.doc();
		doc
			.create(object)
			.then((data) => {
				console.log(data);
				return { id: doc.id, ...object };
			})
			.then(() => console.log("Guardado con exito"))
			.catch((err) => console.log(err));
	}

	saveMany(array) {
		const db = admin.firestore();
		const query = db.collection(this.collection);
		array.forEach((object) => {
			let doc = query.doc();
			doc
				.create(object)
				.then((data) => console.log(data))
				.then(() => console.log("Producto guardado"))
				.catch((err) => console.log(err));
		});
	}
}

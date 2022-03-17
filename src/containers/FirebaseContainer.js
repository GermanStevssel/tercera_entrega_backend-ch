import admin from "firebase-admin";
import { config } from "../config.js";

admin.initializeApp({ credential: admin.credential.cert(config.firebase) });

export default class FirebaseContainer {
	constructor(collection) {
		this.collection = collection;
	}

	getAll = async () => {
		const results = [];

		try {
			const db = admin.firestore();
			const query = db.collection(this.collection);
			const querySnapshot = await query.get();
			querySnapshot.forEach((doc) => {
				results.push({ id: doc.id, ...doc.data() });
			});
		} catch (err) {
			console.log(err);
			throw new Error(`Error al intentar obtener todo: ${err}`);
		}
		console.log("results", results);
		return results;
	};

	getById = async (id) => {
		try {
			const db = admin.firestore();
			const query = db.collection(this.collection);
			const doc = await query.doc(id).get();

			console.log("doc:", doc.length);
			if (!doc.exists) {
				console.log(`Error al listar por el id: ${id}`);
			} else {
			}
		} catch (err) {
			console.log("error:", err);
		}
	};

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

	deleteAll = async () => {
		try {
			const docs = await this.listAll();
			const ids = docs.map((doc) => doc.id);
			const deleteDocs = ids.map((id) => this.delete(id));
			await Promise.allSettled(deleteDocs);
		} catch (err) {
			throw new Error(`Error al borrar: ${err}`);
		}
	};

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
			.then(() => console.log("Guardado con exito"))
			.catch((err) => console.log(err));

		return { id: doc.id, ...object };
	}
}

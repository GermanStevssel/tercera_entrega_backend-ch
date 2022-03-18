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

		return results;
	};

	getById = async (id) => {
		try {
			const db = admin.firestore();
			const query = db.collection(this.collection);
			const doc = await query.doc(id).get();

			if (!doc.exists) {
				console.log(`Error al listar por el id: ${id}`);
			} else {
				return { id, ...doc.data() };
			}
		} catch (err) {
			console.log("error:", err);
			throw new Error(`Error al intentar obtener por id: ${err}`);
		}
	};

	deleteById = async (id) => {
		try {
			const db = admin.firestore();
			const query = db.collection(this.collection);
			const doc = await query.doc(id).delete();

			console.log(`Se ha eliminadoc el id ${id}`);
			return `Se ha eliminado el id ${id}`;
		} catch (err) {
			console.log(err);
			throw new Error(`Error al intentar eliminar por id: ${err}`);
		}
	};

	deleteAll = async () => {
		try {
			const docs = await this.getAll();
			const ids = docs.map((doc) => doc.id);
			const deleteDocs = ids.map((id) => this.deleteById(id));
			await Promise.all(deleteDocs);
			return {
				result: "Todos los productos han sido eliminados",
			};
		} catch (err) {
			throw new Error(`Error al borrar: ${err}`);
		}
	};

	updateById = async (id, object) => {
		object.timestamp = new Date();
		console.log("object", object);
		try {
			const db = admin.firestore();
			const query = db.collection(this.collection);
			console.log("query:", query);
			const doc = query.doc(id);
			console.log("doc:", doc);
			console.log("docID:", doc.id);
			if (!doc.exists) {
				console.log(`Error al actualizar el objeto con id: ${id}`);
				throw new Error(`No existe el objeto con id: ${id}`);
			}

			const item = await doc.get();
			item.update(object);
		} catch (err) {
			console.log(err);
			throw new Error(`Error al actualizar el objeto con id: ${id}`);
		}
	};

	save = async (object) => {
		const { name, price, thumbnail } = object;
		if (name !== "" && price !== "" && thumbnail !== "") {
			object.timestamp = new Date();
			try {
				const db = admin.firestore();
				const query = db.collection(this.collection);
				const doc = query.doc();
				object.id = doc.id;
				await doc.create(object);
				console.log("Guardado con exito");
				return { id: doc.id, ...object };
			} catch (err) {
				console.log(err);
				throw new Error(`Error al guardar: ${err}`);
			}
		} else {
			return { error: "Complete los datos faltantes" };
		}
	};
}

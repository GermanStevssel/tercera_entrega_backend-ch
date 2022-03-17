import admin from "firebase-admin";

import { serviceAccount } from "./firebase/basefirebase-a7ba6-firebase-adminsdk-65n9g-9106c018a8";

import { ContainerFirebase } from "./src/containers/FirebaseContainer.js";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

console.log("DB Firebase conectada");

const container = new ContainerFirebase(admin, "products");

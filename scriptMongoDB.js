import { ContainerMongo } from "./container/containerMongo.js";
import mongoose from "mongoose";
import * as model from "./models/products.js";
const URL = "mongodb://localhost:27017/api";

mongoose
	.connect(URL)
	.then(() => console.log("Base de datos MongoDB conectada"))
	.catch((err) => console.log(err));

const container = new ContainerMongo(model.productsModel);

/* 
id
timestamp
nombre
descripcion
codigo
foto url
precio
stock
*/

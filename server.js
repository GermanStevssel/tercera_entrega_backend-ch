import "dotenv/config";
import express, { json, urlencoded } from "express";
import { productsRouter } from "./src/routers/productsRouter.js";
import { cartRouter } from "./src/routers/cartsRouter.js";
const app = express();

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);
app.use(express.static("public"));

productsRouter.use(json());
productsRouter.use(urlencoded({ extended: true }));
cartRouter.use(json());
cartRouter.use(urlencoded({ extended: true }));

const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log(`Express is listening in port http://localhost:${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

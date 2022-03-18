import "dotenv/config";
import express, { json, urlencoded } from "express";
import { productsRouter } from "./src/routers/productsRouter.js";
import { cartRouter } from "./src/routers/cartsRouter.js";
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
	console.log(`Express is listening in port http://localhost:${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

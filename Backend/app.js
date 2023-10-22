import express from "express";
import dotenv from "dotenv";

// import utiles
import "./utils/index.js";
// imported routes
import router from "./routes/index.js";

// import middlwares
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const port = process.env.port || 3000;

// define express
const app = express();

// use json to handel data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use("/", router);

// use error Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;

import express from "express";
import mongoose from "mongoose";
import blogRouter from "./controller/blogs.js";
import userRouter from "./controller/users.js";
import {
	unknownEndpont,
	requestLogger,
	errorLogger,
	userExtractor
} from "./utils/middleware.js";
import config from "./utils/config.js";
import logger from "./utils/logger.js";

const app = express();
logger.info("connecting to database");

mongoose
	.connect(config.DB_URL, { family: 4 })
	.then(() => logger.info("connected to MongoDb"))
	.catch((err) =>
		logger.error("Couldn't connect to the database: \n", err.message),
	);

app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", userExtractor,blogRouter);
app.use("/api", userRouter);
app.use(unknownEndpont);
app.use(errorLogger);

export default app;

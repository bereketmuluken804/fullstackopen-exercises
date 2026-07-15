import { configDotenv } from "dotenv";

configDotenv();
const PORT = process.env.PORT;
const DB_URL =
	process.env.NODE_ENV === "test" ? process.env.TEST_DB_URL : process.env.DB_URL;

export default { PORT, DB_URL };

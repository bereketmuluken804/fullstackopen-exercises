import express from "express";
import config from "./utils/config.js";
import app from "./app.js";
const PORT = config.PORT;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

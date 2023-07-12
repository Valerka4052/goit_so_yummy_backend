const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
require("dotenv").config();
// const operationsRouter = require("./route/operations");
const swaggerDocument = require("./swagger.json");
const authRouter = require("./route/auth");
const operationsRouter = require("./route/operations");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// тут повинні бути роути
app.use("/users", authRouter);
app.use("/", operationsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// тут повинні бути роути

app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;

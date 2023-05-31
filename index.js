const express = require("express");
const winston = require("winston");
const { getWinsonTransport } = require("@hyperdx/node-opentelemetry");

const MAX_LEVEL = "info";

const logger = winston.createLogger({
  level: MAX_LEVEL,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    getWinsonTransport(MAX_LEVEL), // append this to the existing transports
  ],
});

const app = express();

app.get("/", (req, res) => {
  logger.info({
    message: "Hello world received a request. 🐱🐱🐱🐱🐱",
    headers: req.headers,
  });
  const name = process.env.NAME || "World";
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT) || 9999;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});

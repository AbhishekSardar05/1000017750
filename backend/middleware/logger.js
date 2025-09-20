const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../logs.txt");

function logger(req, res, next) {
  const log = `${new Date().toISOString()} | ${req.method} ${req.originalUrl}`;
  fs.appendFileSync(logFile, log + "\n");
  next();
}

module.exports = logger;

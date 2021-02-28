const Tail = require("always-tail2");
const fs = require("fs");
const poeLogParser = require("./parser");

const args = process.argv.slice(2);

const logPath = args[0];
const handler = args[1] || "console";


const lineHandler = (line) => {
  const lineObject = poeLogParser.processLine(line, true);
  if (lineObject.type && lineObject.type !== "donotsend") {
    console.log(line);
  }
};

const handlers = {
	console: (line) => lineHandler(line),
  ws: (line) => {},
  http: (line) => {}
}

if (false == fs.existsSync(logPath)) {
  throw new Error(`PoE log file not found at path ${logPath}`);
}

const tailer = new Tail(logPath, "\n", { interval: 499 });

tailer.on("line", handlers[handler]);
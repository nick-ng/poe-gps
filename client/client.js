const Tail = require("always-tail2");
const fs = require("fs");
const poeLogParser = require("./parser");
const io = require("socket.io-client");

console.log(process.argv);

const args = process.argv.slice(2);

const logPath = args[0];
const handlerType = args[1] || "console";
const endpoint = args[2] || "http://localhost:3000";

/**
 * handles setup logic for handler type
 * @param {string} endpoint handler endpoint
 * @param {string} handler type of handler to setup, http or websocket
 */
function setupHandler(endpoint, handler) {

  if (handler === "ws") {
    return io(endpoint);
  }

  if (handler === "http") {
    return {}
  }
}

/**
 * process raw log line with provided callback
 * @param {string} line raw log line
 * @param {function} cb callback function to delagate handling of lineObject
 */
function processLine (line, cb) {
  const lineObject = poeLogParser.processLine(line, true);
  if (lineObject.type && lineObject.type !== "donotsend") {
    cb(lineObject);
  }
};

if (false == fs.existsSync(logPath)) {
  throw new Error(`PoE log file not found at path ${logPath}`);
}

const handlerDelagate = setupHandler(endpoint, handlerType);

/*
  TODO figure out how to send client identifier information
    - who the log entry belongs to, argument passed in?
    - add additional context information of client identifier, 
*/
const handlers = {
	console: (line) => processLine(line, console.log),
  ws: (line) => {
    let callBack = lineObject => handlerDelagate.emit("line", lineObject);
    processLine(line, callBack)
  },
  http: (line) => {
    // TODO implement http handler, maybe not required?
  }
}

const tailer = new Tail(logPath, "\n", { interval: 499 });

console.log("Starting log forward of type: " + handlerType)
tailer.on("line", handlers[handlerType]);
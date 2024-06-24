let log = console.log;
let warn = console.warn;
let error = console.error;

const loggerThis = typeof window === "undefined" ? globalThis : window;

const funtionRunner = function (...args) {
  return this.apply(this, args);
};

const promiseRunner = async function (...args) {
  return await this.apply(this, args);
};

const funtionLogRunner = function (...args) {
  log("Function", "Run", this.name, ...args);
  try {
    const result = this.apply(this, args);
    log("Function", "Res", this.name, result);
    return result;
  } catch (err) {
    error("Function", "Err", this.name, err);
    throw err;
  }
};

const promiseLogRunner = async function (...args) {
  log("Promise", "Run", this.name, ...args);
  try {
    const result = await this.apply(this, args);
    log("Promise", "Res", this.name, result);
    return result;
  } catch (err) {
    error("Promise", "err", this.name, err);
    throw err;
  }
};

const funtionStringLogRunner = function (...args) {
  const a = args.map((a) => JSON.stringify(a)).join(" :: ");
  log("Function", "Run", this.name, a);
  try {
    const result = this.apply(this, args);
    log("Function", "Res", this.name, JSON.stringify(result));
    return result;
  } catch (err) {
    error("Function", "Err", this.name, JSON.stringify(err));
    throw err;
  }
};

const promiseStringLogRunner = async function (...args) {
  const a = args.map((a) => JSON.stringify(a)).join(" :: ");
  log("Promise", "Run", this.name, a);
  try {
    const result = await this.apply(this, args);
    log("Promise", "Res", this.name, JSON.stringify(result));
    return result;
  } catch (err) {
    error("Promise", "Err", this.name, JSON.stringify(err));
    throw err;
  }
};

let logger = function (...args) {
  if (loggerThis.isDebugModeActive) {
    if (loggerThis.isStringModeActive)
      return funtionStringLogRunner.apply(this, args);
    else return funtionLogRunner.apply(this, args);
  } else funtionRunner.apply(this, args);
};

let pLogger = function (...args) {
  if (loggerThis.isDebugModeActive) {
    if (loggerThis.isStringModeActive)
      return promiseStringLogRunner.apply(this, args);
    else return promiseLogRunner.apply(this, args);
  } else promiseRunner.apply(this, args);
};

loggerThis.isDebugModeActive = false;
loggerThis.isStringModeActive = false;

Function.prototype.logger = logger;
Function.prototype.pLogger = pLogger;

exports.log = log;
exports.warn = warn;
exports.error = error;

exports.funtionRunner = funtionRunner;
exports.promiseRunner = promiseRunner;

exports.funtionLogRunner = funtionLogRunner;
exports.promiseLogRunner = promiseLogRunner;

exports.funtionStringLogRunner = funtionStringLogRunner;
exports.promiseStringLogRunner = promiseStringLogRunner;

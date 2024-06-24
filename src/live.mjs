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
  log("Function Run", ...args);
  try {
    const result = this.apply(this, args);
    log("Function Res", result);
    return result;
  } catch (err) {
    error("Function Err", err);
    throw err;
  }
};

const promiseLogRunner = async function (...args) {
  log("Promise Run", ...args);
  try {
    const result = await this.apply(this, args);
    log("Promise Res", result);
    return result;
  } catch (err) {
    error("Promise Err", err);
    throw err;
  }
};

const funtionStringLogRunner = function (...args) {
  log(`Function Run :: ${args.map((a) => JSON.stringify(a)).join(" :: ")}`);
  try {
    const result = this.apply(this, args);
    log(`Function Res :: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    error(`Function Err :: ${JSON.stringify(err)}`);
    throw err;
  }
};

const promiseStringLogRunner = async function (...args) {
  log(`Promise Run :: ${args.map((a) => JSON.stringify(a)).join(" :: ")}`);
  try {
    const result = await this.apply(this, args);
    log(`Promise Res :: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    error("Promise Err", err);
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

export {
  log,
  warn,
  error,
  funtionRunner,
  promiseRunner,
  funtionLogRunner,
  promiseLogRunner,
  funtionStringLogRunner,
  promiseStringLogRunner,
};

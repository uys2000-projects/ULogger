let log = console.log;
let warn = console.warn;
let error = console.error;

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

var logger = function (...args) {
  if (window.isDebugModeActive) {
    if (window.isStringModeActive)
      return funtionStringLogRunner.apply(this, args);
    else return funtionLogRunner.apply(this, args);
  } else funtionRunner.apply(this, args);
};

var pLogger = function (...args) {
  if (window.isDebugModeActive) {
    if (window.isStringModeActive)
      return promiseStringLogRunner.apply(this, args);
    else return promiseLogRunner.apply(this, args);
  } else promiseRunner.apply(this, args);
};

window.isDebugModeActive = false;
window.isStringModeActive = false;

Function.prototype.logger = logger;
Function.prototype.pLogger = pLogger;

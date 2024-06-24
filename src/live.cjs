let log = console.log;
let warn = console.warn;
let error = console.error;

/**
 *
 * @param  {...any} args
 * @return {ReturnType this}
 */
/** @this Function */
const funtionRunner = function (...args) {
  return this.apply(this, args);
};

/**
 *
 * @param  {...any} args
 * @return {ReturnType this}
 */
/** @this Promise<any> */
const promiseRunner = async function (...args) {
  return await this.apply(this, args);
};

/**
 *
 * @param  {...any} args
 * @return {ReturnType this}
 */
/** @this Function */
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

/**
 *
 * @param  {...any} args
 * @return {ReturnType this}
 */
/** @this Promise */
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

/**
 *
 * @param  {...any} args
 * @return {ReturnType this}
 */
/** @this Function */
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

/**
 *
 * @param  {...any} args
 * @return {ReturnType this}
 */
/** @this Promise */
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

let logger = (...args) => {
  if (this.isDebugModeActive) {
    if (this.isStringModeActive)
      return funtionStringLogRunner.apply(this, args);
    else return funtionLogRunner.apply(this, args);
  } else funtionRunner.apply(this, args);
};

let pLogger = (...args) => {
  if (this.isDebugModeActive) {
    if (this.isStringModeActive)
      return promiseStringLogRunner.apply(this, args);
    else return promiseLogRunner.apply(this, args);
  } else promiseRunner.apply(this, args);
};

Function.prototype.bind(this, logger);
Function.prototype.bind(this, pLogger);

exports.log = log;
exports.warn = warn;
exports.error = error;

exports.funtionRunner = funtionRunner;
exports.promiseRunner = promiseRunner;

exports.funtionLogRunner = funtionLogRunner;
exports.promiseLogRunner = promiseLogRunner;

exports.funtionStringLogRunner = funtionStringLogRunner;
exports.promiseStringLogRunner = promiseStringLogRunner;

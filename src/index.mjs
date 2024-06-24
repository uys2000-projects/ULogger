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

/**
 *
 * @param {boolean} debugMode
 * @param {boolean} debugAsStringMode
 */
const setULogger = function (
  isActive,
  isStringModeActive,
  logFuncion = log,
  warnFuncion = warn,
  errorFuncion = error
) {
  log = logFuncion;
  warn = warnFuncion;
  error = errorFuncion;
  if (isActive) {
    warn("ULogger :: Active");
    logger = funtionLogRunner;
    pLogger = promiseLogRunner;
    if (isStringModeActive) {
      warn("ULogger StringMode :: Active");
      logger = funtionStringLogRunner;
      pLogger = promiseStringLogRunner;
    }
    Function.prototype.bind(this, logger);
    Function.prototype.bind(this, pLogger);
  }
};

let logger = funtionRunner;
let pLogger = promiseRunner;

Function.prototype.bind(this, logger);
Function.prototype.bind(this, pLogger);

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
  setULogger,
};

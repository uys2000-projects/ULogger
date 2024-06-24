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
  log(`Function :: ${this.name} :: Run :: ${a}`);
  try {
    const result = this.apply(this, args);
    log(`Function :: ${this.name} :: Res :: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    error(`Function :: ${this.name} :: Err :: ${JSON.stringify(err)}`);
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
    Function.prototype.logger = logger;
    Function.prototype.pLogger = pLogger;
  }
};

let logger = funtionRunner;
let pLogger = promiseRunner;

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

exports.setULogger = setULogger;

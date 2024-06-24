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

/**
 *
 * @param {boolean} isActive
 * @param {boolean} isStringModeActive
 * @param {(type: "Function" | "Promise",status: "Run" | "Res" | "Err", name: string, ...args: any[]) => any} logFuncion
 * @param {(type: "Function" | "Promise",status: "Run" | "Res" | "Err", name: string, ...args: any[]) => any} warnFuncion
 * @param {(type: "Function" | "Promise",status: "Run" | "Res" | "Err", name: string, ...args: any[]) => any} errorFuncion
 */
var setULogger = function (
  isActive,
  isStringModeActive,
  logFuncion,
  warnFuncion,
  errorFuncion
) {
  if (logFuncion) log = logFuncion;
  if (warnFuncion) warn = warnFuncion;
  if (errorFuncion) error = errorFuncion;
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

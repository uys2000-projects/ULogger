"use strict";

let callLog = (name, ...args) => console.log("c", name, ...args);
let fReturnLog = (name, result, ...args) => console.log("fR", name, result);
let pReturnLog = (name, result, ...args) => console.log("pR", name, result);
let tErrorLog = (name, err, ...args) => console.error("tE", name, err);
let cErrorLog = (name, err, ...args) => console.error("cE", name, err);

const runner = function (...args) {
  return this(...args);
};

const logRunner = function (...args) {
  callLog(this.name, ...args);

  let result;
  // run for functions
  try {
    result = this(...args);
    if (!(result instanceof Promise)) {
      fReturnLog(this.name, result, ...args);
      return result;
    }
  } catch (err) {
    tErrorLog(this.name, err, ...args);
    throw err;
  }

  // run for Promises
  return result
    .then((r) => {
      pReturnLog(this.name, r, ...args);
      return r;
    })
    .catch((err) => {
      cErrorLog(this.name, err, ...args);
      throw err;
    });
};

const setULogger = function (
  active = true,
  callLogger = callLog,
  fReturnLogger = fReturnLog,
  pReturnLogger = pReturnLog,
  tErrorLogger = tErrorLog,
  cErrorLogger = cErrorLog
) {
  // set default loggers
  callLog = callLogger;
  fReturnLog = fReturnLogger;
  pReturnLog = pReturnLogger;
  tErrorLog = tErrorLogger;
  cErrorLog = cErrorLogger;

  Function.prototype.uLog = runner;
  if (active) {
    Function.prototype.uLog = logRunner;
  }
};

Function.prototype.uLog = runner;

exports.setULogger = setULogger;

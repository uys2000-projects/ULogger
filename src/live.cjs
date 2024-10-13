"use strict";

const runner = function (...args) {
  this.callLog(this.name, ...args);

  let result;
  // run for functions
  try {
    result = this(...args);
    if (!(result instanceof Promise)) {
      this.fReturnLog(this.name, result, ...args);
      return result;
    }
  } catch (err) {
    this.tErrorLog(this.name, err, ...args);
    throw err;
  }

  // run for Promises
  return result
    .then((r) => {
      this.pReturnLog(this.name, r, ...args);
      return r;
    })
    .catch((err) => {
      this.cErrorLog(this.name, err, ...args);
      throw err;
    });
};

Function.prototype.uLog = runner;
Function.prototype.callLog = (name, ...args) => console.log("c", name, ...args);
Function.prototype.fReturnLog = (name, result, ...args) =>
  console.log("fR", name, result);
Function.prototype.pReturnLog = (name, result, ...args) =>
  console.log("pR", name, result);
Function.prototype.tErrorLog = (name, err, ...args) =>
  console.error("tE", name, err);
Function.prototype.cErrorLog = (name, err, ...args) =>
  console.error("cE", name, err);

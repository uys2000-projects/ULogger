require("../src/live.cjs");

const testFunction = function (isError, argument1, argument2, returnValue) {
  if (isError) throw returnValue;
  return returnValue;
};
const testPromise = function (isError, argument1, argument2, returnValue) {
  return new Promise((resolve, reject) => {
    if (isError) reject(returnValue);
    resolve(returnValue);
  });
};

const runFunctionTest = function () {
  testFunction.uLog(false, "Argument1", "Argument2", "ReturnValue");
  try {
    testFunction.uLog(true, "Argument1", "Argument2", "ReturnValue");
  } catch {}
};
const runPromiseTest = function () {
  testPromise.uLog(false, "Argument1", "Argument2", "ReturnValue");
  testPromise
    .uLog(true, "Argument1", "Argument2", "ReturnValue")
    .catch(() => "");
};

console.log("\nBefore Disable");
runFunctionTest();
runPromiseTest();
console.log("After Disable");
Function.prototype.callLog = (name, ...args) => console.log("callLog");
Function.prototype.fReturnLog = (name, result, ...args) =>
  console.log("fReturnLog");
Function.prototype.pReturnLog = (name, result, ...args) =>
  console.log("pReturnLog");
Function.prototype.tErrorLog = (name, err, ...args) =>
  console.error("tErrorLog");
Function.prototype.cErrorLog = (name, err, ...args) =>
  console.error("cErrorLog");
setTimeout(() => {
  runFunctionTest();
  runPromiseTest();
}, 1000);

const { setULogger } = require("../src/index.cjs");

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

console.log("\nBefore Activate");
runFunctionTest();
runPromiseTest();
console.log("After Activate");
setULogger(
  true,
  (name, ...args) => console.log("c", name, ...args),
  (name, functionResult, ...args) => console.log("fR", name, functionResult),
  (name, promiseResult, ...args) => console.log("pR", name, promiseResult),
  (name, functionError, ...args) => console.error("tE", name, functionError),
  (name, promiseError, ...args) => console.error("cE", name, promiseError)
);
runFunctionTest();
runPromiseTest();

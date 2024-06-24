const uLogger = require("../src/index.cjs");

/**
 *
 * @param {boolean} isError
 * @param {string} argument1
 * @param {any} argument2
 * @param {string} returnValue
 * @returns
 */
const nodeTestFunction = function (isError, argument1, argument2, returnValue) {
  console.log("Arguments :", JSON.stringify(arguments));
  if (isError) throw returnValue;
  return returnValue;
};
const runTest = function () {
  console.log(
    `\nnodeTestFunction.logger(false, "Argument1", "Argument2", "ReturnValue")`
  );
  nodeTestFunction.logger(false, "Argument1", "Argument2", "ReturnValue");
  try {
    console.log(
      `\nnodeTestFunction.logger(false, "Argument1", "Argument2", "ReturnValue")`
    );
    nodeTestFunction.logger(true, "Argument1", "Argument2", "ReturnValue");
  } catch {}
};

console.log("\n\nuLogger.setULogger(false, false);");
uLogger.setULogger(false, false);
runTest();
console.log("\n\nuLogger.setULogger(true, false);");
uLogger.setULogger(true, false);
runTest();
console.log("\n\nuLogger.setULogger(true, true);");
uLogger.setULogger(true, true);
runTest();

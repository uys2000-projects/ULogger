require("../src/live.cjs");
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

console.log(
  "\n\nglobalThis.isDebugModeActive = false;\nglobalThis.isStringModeActive = false;"
);
globalThis.isDebugModeActive = false;
globalThis.isStringModeActive = false;
runTest();
console.log(
  "\n\nglobalThis.isDebugModeActive = true;\nglobalThis.isStringModeActive = false;"
);
globalThis.isDebugModeActive = true;
globalThis.isStringModeActive = false;
runTest();
console.log(
  "\n\nglobalThis.isDebugModeActive = true;\nglobalThis.isStringModeActive = true;"
);
globalThis.isDebugModeActive = true;
globalThis.isStringModeActive = true;
runTest();

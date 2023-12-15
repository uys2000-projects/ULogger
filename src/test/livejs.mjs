import "../live/index.mjs";

const testFunction = function (result, erResult) {
  if (erResult != undefined) throw erResult;
  return result;
};

const testPromise = function (result, erResult) {
  return new Promise((resolve, reject) => {
    if (erResult != undefined) reject(erResult);
    return resolve(result);
  });
};

const runTest = async function (isActive, isStringModeActive) {
  window.isDebugModeActive = isActive;
  window.isStringModeActive = isStringModeActive;
  try {
    testFunction.logger("FUNCTION_TEST_SUCCESS");
    testFunction.logger("FUNCTION_TEST_ERROR", "TEST_FUNCTION_ERROR");
  } catch {}

  await testPromise.pLogger("PROMISE_TEST_SUCCESS");
  await testPromise
    .pLogger("PROMISE_TEST_ERROR", "TEST_PROMISE_ERROR")
    .catch(() => 0);
};

console.log("Test Will Run 3 Times");

runTest(false, false)
  .then(() => runTest(true, false))
  .then(() => runTest(true, true));

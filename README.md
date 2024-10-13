# ULogger

Basic logging addon for Promises and Functions

## Table of Contents

## Usage 

Two type of integrations are exsist. `Default` mode and `Live` Mode.

### `Default` Mode

Test and usage of `Default` mode.

```javascript
const { setULogger } = require("../src/index.cjs");
// or import { setULogger } from "../src/index.mjs";

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

setULogger(true,
  (name, args) => console.log(name, ...args),
  (name, functionResult, args) => console.log(name, functionResult),
  (name, promiseResult, args) => console.log(name, promiseResult),
  (name, functionError, args) => console.log(name, functionError),
  (name, promiseError, args) => console.log(name, promiseError));

runFunctionTest();
runPromiseTest();
```


### `Live` Mode

Test and usage of `Live` mode.

```javascript
require("../src/index.cjs");
// or import "../src/index.mjs";

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

// it comes with a logger as a default
runFunctionTest();
runPromiseTest();


// logging settings wil be changed after these
Function.prototype.callLog = (name, ...args) => console.log("callLog");
Function.prototype.fReturnLog = (name, result, ...args) =>
  console.log("fReturnLog");
Function.prototype.pReturnLog = (name, result, ...args) =>
  console.log("pReturnLog");
Function.prototype.tErrorLog = (name, err, ...args) =>
  console.error("tErrorLog");
Function.prototype.cErrorLog = (name, err, ...args) =>
  console.error("cErrorLog");

// without timeout previous test results cames with upper changes.
setTimeout(() => {
  runFunctionTest();
  runPromiseTest();
}, 1000);

```
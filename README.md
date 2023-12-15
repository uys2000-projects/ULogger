# ULogger

Basic logging addon for Promises and Functions

## Table of Contents

## Usage 

Two type of integrations are exsist. `Default` mode and `Live` Mode. Also, these two has two type of logging types `Default` and `DebugAsString`.

### `Default` Integration Mode

```javascript
import { setDebugMode } from "u-logger"

setDebugMode(true);


exampleFunction.logger("test")

examplePromise.pLogger("test")
```

#### `Default` Integration With `DebugAsString`

```javascript
import { setDebugMode } from "u-logger"

setDebugMode(true,true);


exampleFunction.logger("test")

examplePromise.pLogger("test")
```

### `Live` Integration Mode

For `JavaScript`
```javascript
import "u-logger/test"

window.isDebugModeActive = true;

exampleFunction.logger("test")

examplePromise.pLogger("test")
```

For `NodeJs`
```javascript
import "u-logger/test"

global.isDebugModeActive = true;

exampleFunction.logger("test")

examplePromise.pLogger("test")
```

#### `Live` Integration With `DebugAsString`

For `JavaScript`
```javascript
import "u-logger/test"

window.isDebugModeActive = true;
window.isStringModeActive = true;

exampleFunction.logger("test")

examplePromise.pLogger("test")
```
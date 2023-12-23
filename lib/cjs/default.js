"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDebugMode = exports.l = void 0;
Function.prototype.logger = function (...args) {
    return this.apply(this, args);
};
Function.prototype.pLogger = function (...args) {
    return this.apply(this, args);
};
let l = function (t, ...args) {
    t;
    return args[args.length - 1];
};
exports.l = l;
const setDebugMode = function (isActive, isStringModeActive) {
    let text = "";
    if (isActive)
        text = `\n=======================================\n=============Debug Mode On=============\n=======================================\n`;
    if (isActive && isStringModeActive)
        text += `=============DebugAsString=============\n=======================================\n`;
    if (isStringModeActive)
        exports.l = l = function (t, ...args) {
            const log = t == "l" ? console.log : t == "e" ? console.error : console.warn;
            log(args.map((a) => JSON.stringify(a)).join("  :::  "));
            return args[args.length - 1];
        };
    else
        exports.l = l = function (t, ...args) {
            const log = t == "l" ? console.log : t == "e" ? console.error : console.warn;
            log(...args);
            return args[args.length - 1];
        };
    if (isActive) {
        Function.prototype.logger = function (...args) {
            l("l", "Function", "Run", this.name, ...args);
            try {
                return l("l", "Function", "Res", this.name, this.apply(this, args));
            }
            catch (e) {
                l("e", "Function", "Err", this.name, ...args);
                throw e;
            }
        };
        Function.prototype.pLogger = function (...args) {
            l("l", "Promise", "Run", this.name, ...args);
            return new Promise((resolve, reject) => {
                this.apply(this, args)
                    .then((res) => resolve(l("l", "Promise", "Res", this.name, res)))
                    .catch((err) => reject(l("e", "Promise", "Err", this.name, err)));
            });
        };
    }
    console.warn(text);
};
exports.setDebugMode = setDebugMode;

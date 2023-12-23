declare global {
  interface Function {
    logger<T extends (...args: any[]) => any>(
      this: T,
      ...args: Parameters<typeof this>
    ): ReturnType<typeof this>;

    pLogger<T extends (...args: any[]) => Promise<any>>(
      this: T,
      ...args: Parameters<typeof this>
    ): ReturnType<typeof this>;
  }

  var isDebugModeActive: boolean | undefined;
  var isStringModeActive: boolean | undefined;
}

const checkDebugModeActive = function () {
  if (typeof window === "undefined") return globalThis.isDebugModeActive;
  else return window.isDebugModeActive;
};

const checkStringModeActive = function () {
  if (typeof window === "undefined") return globalThis.isStringModeActive;
  else return window.isStringModeActive;
};

type L = (type: "l" | "w" | "e", ...args: any[]) => any;
const l: L = function (t, ...args) {
  if (checkDebugModeActive()) {
    const log =
      t == "l" ? console.log : t == "e" ? console.error : console.warn;
    if (checkStringModeActive())
      log(args.map((a) => JSON.stringify(a)).join("  :::  "));
    else log(...args);
  }
  return args[args.length - 1];
};

Function.prototype.logger = function (...args) {
  l("l", "Function", "Run", this.name, ...args);
  try {
    return l("l", "Function", "Res", this.name, this.apply(this, args));
  } catch (e) {
    l("e", "Function", "Err", this.name, ...args);
    throw e;
  }
};

Function.prototype.pLogger = function (this, ...args) {
  l("l", "Promise", "Run", this.name, ...args);
  return new Promise((resolve, reject) => {
    this.apply(this, args)
      .then((res) => resolve(l("l", "Promise", "Res", this.name, res)))
      .catch((err) => reject(l("l", "Promise", "Err", this.name, err)));
  }) as ReturnType<typeof this>;
};

export { checkDebugModeActive, checkStringModeActive };

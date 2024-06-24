export function log(...data: any[]): void;
export function warn(...data: any[]): void;
export function error(...data: any[]): void;

export function funtionRunner<T extends (...args: any[]) => any>(
  this: T,
  ...args: Parameters<typeof this>
): ReturnType<typeof this>;

export function promiseRunner<T extends (...args: any[]) => any>(
  this: T,
  ...args: Parameters<typeof this>
): ReturnType<typeof this>;

export function funtionLogRunner<T extends (...args: any[]) => any>(
  this: T,
  ...args: Parameters<typeof this>
): ReturnType<typeof this>;

export function promiseLogRunner<T extends (...args: any[]) => any>(
  this: T,
  ...args: Parameters<typeof this>
): ReturnType<typeof this>;

export function funtionStringLogRunner<T extends (...args: any[]) => any>(
  this: T,
  ...args: Parameters<typeof this>
): ReturnType<typeof this>;

export function promiseStringLogRunner<T extends (...args: any[]) => any>(
  this: T,
  ...args: Parameters<typeof this>
): ReturnType<typeof this>;

export function setULogger(
  isActive: boolean,
  isStringModeActive: boolean,
  logFuncion: Function,
  warnFuncion: Function,
  errorFuncion: Function
): void;

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
}

export function log(
  type: "Function" | "Promise",
  status: "Run" | "Res" | "Err",
  ...args: any[]
): any;
export function warn(
  type: "Function" | "Promise",
  status: "Run" | "Res" | "Err",
  ...args: any[]
): any;
export function error(
  type: "Function" | "Promise",
  status: "Run" | "Res" | "Err",
  ...args: any[]
): any;

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
  logFuncion: (
    type: "Function" | "Promise",
    status: "Run" | "Res" | "Err",
    ...args: any[]
  ) => any,
  warnFuncion: (
    type: "Function" | "Promise",
    status: "Run" | "Res" | "Err",
    ...args: any[]
  ) => any,
  errorFuncion: (
    type: "Function" | "Promise",
    status: "Run" | "Res" | "Err",
    ...args: any[]
  ) => any
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

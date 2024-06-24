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

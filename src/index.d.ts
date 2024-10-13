function callLog(name: string, ...args: any[]): void;
function fReturnLog(name: string, result: any, ...args: any[]): void;
function pReturnLog(name: string, result: any, ...args: any[]): void;
function tErrorLog(name: string, err: unknown, ...args: any[]): void;
function cErrorLog(name: string, err: unknown, ...args: any[]): void;
export function setULogger(
  active: boolean = true,
  callLogger = callLog,
  fReturnLogger = fReturnLog,
  pReturnLogger = pReturnLog,
  tErrorLogger = tErrorLog,
  cErrorLogger = cErrorLog
): void;

declare global {
  interface Function {
    uLog<T extends (...args: any[]) => any>(
      this: T,
      ...args: Parameters<typeof this>
    ): ReturnType<typeof this>;
  }
}

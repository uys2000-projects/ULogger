function callLog(name: string, ...args: any[]): void;
function returnLog(name: string, result: any, ...args: any[]): void;
function errorLog(name: string, err: any, ...args: any[]): void;

declare global {
  interface Function {
    uLog<T extends (...args: any[]) => any>(
      this: T,
      ...args: Parameters<typeof this>
    ): ReturnType<typeof this>;

    callLog(name: string, ...args: any[]): void;
    fReturnLog(name: string, result: any, ...args: any[]): void;
    pReturnLog(name: string, result: any, ...args: any[]): void;
    tErrorLog(name: string, err: any, ...args: any[]): void;
    cErrorLog(name: string, err: any, ...args: any[]): void;
  }
}

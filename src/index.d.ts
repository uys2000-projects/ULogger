declare module "u-logger" {
  export function l(t: "c" | "w" | "e", ...args: any[]): any;
  export function setDebugMode(
    isActive: boolean,
    isStringModeActiveisActive?: boolean
  ): void;
}

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

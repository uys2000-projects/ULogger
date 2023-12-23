declare global {
    interface Function {
        logger<T extends (...args: any[]) => any>(this: T, ...args: Parameters<typeof this>): ReturnType<typeof this>;
        pLogger<T extends (...args: any[]) => Promise<any>>(this: T, ...args: Parameters<typeof this>): ReturnType<typeof this>;
    }
    var isDebugModeActive: boolean | undefined;
    var isStringModeActive: boolean | undefined;
}
declare const checkDebugModeActive: () => boolean | undefined;
declare const checkStringModeActive: () => boolean | undefined;
export { checkDebugModeActive, checkStringModeActive };
//# sourceMappingURL=live.d.ts.map
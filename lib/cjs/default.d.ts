type L = (type: "l" | "w" | "e", ...args: any[]) => any;
declare let l: L;
declare const setDebugMode: (isActive: boolean, isStringModeActive?: boolean) => void;
declare global {
    interface Function {
        logger<T extends (...args: any[]) => any>(this: T, ...args: Parameters<typeof this>): ReturnType<typeof this>;
        pLogger<T extends (...args: any[]) => Promise<any>>(this: T, ...args: Parameters<typeof this>): ReturnType<typeof this>;
    }
}
export { l, setDebugMode };
//# sourceMappingURL=default.d.ts.map
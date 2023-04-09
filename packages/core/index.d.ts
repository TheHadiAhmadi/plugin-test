export type Context = {
    addHook: (name: any, callback: any) => () => void,
    runHook: (name: any, params?: any) => void,
    addFilter: (name: any, value: any) => void,
    runFilter: (name: any, value: any) => any,
}

export type Plugin<T extends Context = never> = {
    name: string
    description?: string
    init: (ctx: T) => void
}

export type HookParam = any
export type HookCallback = (param: HookParam) => HookParam | undefined | void 
export type HookCallbacks = {
    [x: string]: HookCallback[]
}

export type init = (plugins: Plugin[]) => void 
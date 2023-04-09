import { Context, Plugin } from "@undefined/core";

export interface ExpressContext extends Context {
    addRoute: (slug: string, method: 'patch' | 'put' | 'get' | 'post' | 'delete', callback: (req: any, res: any) => void) => void
    addMiddleware: (callback: (req: any, res: any, next: any) => void) => void
}
export interface ExpressPlugin extends Plugin<ExpressContext> {
    // 
}

export interface ExpressConfig {
    port: number
}

export type ExpressPluginFactory = (config: ExpressConfig) => ExpressPlugin

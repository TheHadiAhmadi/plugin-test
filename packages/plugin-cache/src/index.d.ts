import { Context, Plugin } from "@undefined/core";

export interface CacheContext extends Context {
    setCache: (key: string, valuePromise?: Promise<any> | any) => any
    getCache: (key: string) => any
}
export interface CachePlugin extends Plugin<CacheContext> {
    // 
}

export interface CacheConfig {
    port: number
}

export type CachePluginFactory = (config: CacheConfig) => CachePlugin

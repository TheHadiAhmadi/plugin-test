import { filter, off, on, run } from "./hook"

export type Context = {
    addHook: (name: any, callback: any) => () => void,
    runHook: (name: any, params?: any) => void,
    addFilter: (name: any, value: any) => void,
    runFilter: (name: any, value: any) => any,
}


const addHook: Context['addHook'] = (name, callback) => {
    on(name, callback)

    return () => {
        off(name, callback)
    }
}

const runHook: Context['runHook'] = (name, params) => {
    return run(name, params)
}

const addFilter: Context['addFilter'] = (name, value) => {
    return on(name, value)
}

const runFilter: Context['runFilter'] = (name, value) => {
    return filter(name, value)
}

export type Plugin<T extends Context = any> = {
    name: string
    description?: string
    init: (ctx: T) => void
}


export function initPlugins(plugins: Plugin[]) {
    const ctx: Context = {
        addHook,
        runHook,
        addFilter,
        runFilter,
    }

    const output = plugins.map(plugin => {
        addHook('plugin:init', () => {
            plugin.init(ctx)
        })
    })
    runHook('plugin:init')
}
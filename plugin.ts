import { filter, off, on, run } from "./hook"

function addHook(name, callback) {
    console.log('addHook', name)
    on(name, callback)
    return () => {
        off(name, callback)
    }
}

function runHook(name, params) {
    console.log('runHook', name)

    return run(name, params)
}

function addFilter(name, value) {
    return on(name, value)
}

function runFilter(name, value) {
    return filter(name, value)
}



// // interface Plugin<T> {
// //     name?: string,
// //     description?: string
// //     init: (ctx: T) => void
// // }

// // type Ctx = {
// //     addHook: any,
// //     runHook: any,
// //     addFilter: any,
// //     runFilter: any,
// //     addCtx: any,
// // }

// // type BaseCtx = Ctx & {
// //     addService: any,
// //     addMiddleware: any
// // }


// // interface Plugin<T> {
// //     name: string,
// //     init: (ctx: T) => void
// // }

// // interface BaseCtx {
// //     a: string
// // }
// // interface BasePlugin extends Plugin<BaseCtx> {
// //     routes: []
// //     // 
// // }

// type InternalPlugin<T = {}, U = {}> = {
//     ctx: T
//     fields: Partial<U>
// }

// type PluginContext<T extends Plugin> = ToInternalPlugin<T>['ctx']
// type PluginFields<T extends Plugin> = Partial<ToInternalPlugin<T>['fields']>

// type BaseContext = {
//     addHook: (name: string, cb: () => void ) => void
// }
// type BaseFields = {
//     name: string;
//     // init: (ctx: any) => void
// }

// type BasePlugin<T = {}, U ={}> = {
//     fields: T & BaseFields;
//     ctx: U & BaseContext
// }

// type PluginType<
//         T extends InternalPlugin = InternalPlugin, 
//     > = 
//     T['fields'] & {
//         name: string, 
//         init: (ctx: T['ctx']) => void
//     }

// type ToInternalPlugin<T extends Plugin> = {
//     ctx: Parameters<T['init']>[0]
//     fields: Omit<T, 'init' | 'name'>
// }
    
// interface Plugin<T extends BaseFields = BaseFields, U extends BaseContext = BaseContext> extends BasePlugin<{ctx: U, fields: T}> {}

// type Extends<Plugin1 extends Plugin, Plugin2 extends Plugin> = {
//     ctx: PluginContext<Plugin1> & PluginContext<Plugin2>
//     fields: PluginFields<Plugin1> & PluginFields<Plugin2>
// }
    
// function createPlugin<T extends Plugin = Plugin, U extends Plugin = Plugin>(fields: U): Extends<T, U> {
//     return fields as unknown as Extends<T, U>
// }




///////////////////////////////////////
// interface ExpressContext extends BaseContext {
//     addRoute: (slug: string, method: 'get' | 'post' | 'put' | 'use' | 'delete', handler: (req: any, res: any) => void) =>  void
//     addMiddleware: (slug: string, handler: (req: any, res: any, next: any) => void) =>  void
// }

// interface ExpressFields extends BaseFields {
//     routes: any[]
// }

// interface ExpressPlugin extends Plugin<ExpressFields, ExpressContext> {}
// // type ExpressPlugin = {
// //     ctx: ExpressContext
// //     fields: ExpressFields
// // }
// const express = createPlugin<ExpressPlugin, BasePlugin>({
//     name: 'express',
//     init(ctx) {
        
        
//     }
// })


// type AnotherPlugin = {
//     ctx: {
//         a: string
//     }, fields: {
//         b: string
//     }
// }

// const another = createPlugin<AnotherPlugin, ExpressPlugin>({
//     name: 'another',
//     init(ctx) {
//         // 
//     },
// })

export type Context = {
    addHook: (name: any, callback: any) => () => void,
    runHook: (name: any, params: any) => void,
    addFilter: (name: any, value: any) => void,
    runFilter: (name: any, value: any) => any,
    addCtx: (key: string, value: any) => void
}

export type Plugin<T extends Context = any> = {
    name: string
    description?: string
    init: (ctx: T) => void
}


export function initPlugins(plugins: Plugin[]) {
    const ctx = {
        addHook,
        runHook,
        addFilter,
        runFilter,
        addCtx(key: string, value: any) {
            ctx[key] = value
        }
    }

    const output = plugins.map(plugin => {
        addHook('plugin:init', () => {
            plugin.init(ctx)
        })
    })
    runHook('plugin:init',undefined)
}



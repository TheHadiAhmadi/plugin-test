import express from 'express'
import { Plugin } from "../plugin"
import { ExpressContext } from './express'

export interface BaseContext extends ExpressContext {
    // addService: (name: string, services: any) => void
    // addRoute: (slug: string, method: string, handler: (req: any, res: any) => void) => void
    // addMiddleware: (handler: (req: any, res: any, next: any) => void) => void
}

export interface BasePlugin extends Plugin<BaseContext> {}
interface BaseConfig {
    // 
}

export default function(config: BaseConfig): BasePlugin {
    return {
        name: 'base', 
        description: 'Add some Express middlewares..',
        init(ctx) {

            console.log('ctx of base')
            ctx.addMiddleware(express.json())

            ctx.addHook('express:listen', (port) => {
                console.log('listening on port: ', port)
            })
        
            // ctx.addRoute('/dashboard', 'get', (req, res) => {
            //     res.send({hello: 'true'})
            // })
        }
    }
}

// ctx.fields['name'] = (params) => {
//     console.log('plugin name is: ', params)
// }

// ctx.fields['routes'] = (params) => {
//     Object.keys(params).map(key => {
//         ctx.addHook('init', (app) => {
//             const [method, slug] = key.split(' ')
//             app[method](slug, params[key])
//         })    
//     })
// }

// ctx.fields['middlewares'] = (params) => {
//     params.map(middleware => {
//         ctx.addHook('init', (app) => {
//             app.use(middleware)
//         })
//     })
// }

// ctx.fields['services'] = (params) => {
//     Object.keys(params).map(key => {
//         ctx.addHook('init', (app) => {
//             addServiceToApp(app, params[key], key)
//         })
//     })
// }

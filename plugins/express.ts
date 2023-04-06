import { Context, Plugin } from "../plugin";
import express from 'express'

export interface ExpressContext extends Context {
    addRoute: (slug: string, method: 'get' | 'post' | 'delete', callback: (req: any, res: any) => void) => void
    addMiddleware: (callback: (req: any, res: any, next: any) => void) => void
}
export interface ExpressPlugin extends Plugin<ExpressContext> {
    // 
}

export interface ExpressConfig {
    port: number
}

export default function(config: ExpressConfig): ExpressPlugin {
    return {
        name: 'express',
        description: 'Start point of application',
        init(ctx) {
            console.log('ctx of express')
            const app = express()                

            ctx.addCtx('addRoute', (slug: string, method: 'get' | 'post' | 'delete', callback: (req: any, res: any) => void) => {
                app[method](slug, callback)
            }) 
            ctx.addCtx('addMiddleware', (callback: (req: any, res: any, next: any) => void) => {
                app.use(callback)
            }) 

            ctx.runHook('express:init', app)

            const port = config.port || process.env.PORT || 3000
            app.listen(port, () => {
                ctx.runHook('express:listen', port)
            })
        }
    }
}
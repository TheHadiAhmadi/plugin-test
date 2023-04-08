import { Context, Plugin } from "../lib/plugin";
import express from 'express'

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

export default function(config: ExpressConfig): ExpressPlugin {
    return {
        name: 'express',
        description: 'Start point of application',
        init(ctx) {
            const app = express()                

            ctx.addRoute = (slug, method, callback) => {
                app[method](slug, callback)
            }
            ctx.addMiddleware = callback => {
                app.use(callback)
            }

            ctx.runHook('express:init', app)

            const port = config.port || process.env.PORT || 3000
            app.listen(port, () => {
                ctx.runHook('express:listen', port)
            })
            return () => {
                // app.
            }
        }
    }
}
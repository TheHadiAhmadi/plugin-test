import express from 'express'

/**
 * @type {import('./plugin').ExpressPluginFactory}
 */

export default function(config) {
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
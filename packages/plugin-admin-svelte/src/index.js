export * from './lib/index.js'
/**
 * 
 * @type {import('.').AdminSveltePluginFactory} 
 */
export default function adminSvelte(config) {
    const routePrefix = config.prefix ?? '/admin'
    return {
        name: 'admin-svelte',
        init(ctx) {
            // based on express, base, knex, svelte, mvc, cache

            const view = ctx.createView(import.meta.url, './pages');

            ctx.addAdminPage = (slug, page) => {
                // ctx.addPage(routePrefix + slug, )

            }

            ctx.addRoute(routePrefix, (req, res) => {
                
            })

            // ctx.addPage('/test', view('index'), {})
            ctx.addAdminPage('/test', view('test', req => ({})))
            
        }
    }
}
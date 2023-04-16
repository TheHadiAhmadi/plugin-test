// export * from './lib/index.js'
/**
 * 
 * @type {import('.').AdminSveltePluginFactory} 
 */
export default function adminSvelte(config = {}) {
    const routePrefix = config.prefix ?? '/admin'
    return {
        name: 'admin-svelte',
        init(ctx) {

            let sidebarItems = []
            let headerItems = []

            const view = ctx.createView(import.meta.url, './pages');

            // ctx.addSidebarItem = (item) => {
            //     sidebarItems = [...sidebarItems, item]
            // }
            
            // ctx.addAdminPage = (slug, page) => {
            //     // ctx.addPage(routePrefix + slug, )
            //     console.log('adding admin page');

            // }

            ctx.addPage(routePrefix, view('index'), () => ({sidebarItems}))


            ctx.addSidebarItem({icon: 'user', title: 'User Management', href: '/admin/users'})
            // ctx.addPage('/test', view('index'), {})
            // ctx.addAdminPage('/', view('index'), req => ({}))
            
        }
    }
}




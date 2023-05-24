// export * from './lib/index.js'

export default function adminSvelte(config = {}) {
    const routePrefix = config.prefix ?? '/admin'
    return {
        name: 'admin-svelte',
        /**
         * @param {import ('.').AdminContext} ctx 
         */
        init(ctx) {            
            ctx.adminPanel = {
                sidebarItems: [],
                headerItems: [],
                addSidebarItem(item){
                    this.sidebarItems= [...this.sidebarItems, item]
                    if(item.href){
                        const view = ctx.createView(import.meta.url, './pages');
                        ctx.addPage(routePrefix, view(item.href),{})
                    }
                    item.children?.forEach(child => {
                        const view = ctx.createView(import.meta.url, './pages');
                        ctx.addPage(routePrefix, view(child.href),{})
                        
                    });
                },
                addHeaderItem(item){
                    //add header items and views
                },
                addAdminPage(slug, page, options={}) {
                    // ctx.addPage(routePrefix + slug, )
                    console.log('adding admin page');
                    const view = ctx.createView(import.meta.url, './pages');
                    ctx.addPage(routePrefix + slug, view(page), options)
                },
            }
            const view = ctx.createView(import.meta.url, './pages');
            console.log("view: ===>",view('index.svelte'))
            let sidebarItems = ctx.adminPanel.sidebarItems
            let headerItems = ctx.adminPanel.headerItems
            // ctx.addPage("/admin", view('index'), () => ({sidebarItems, headerItems}))
            ctx.addPage("/admin", view('Test'))
            
            // ctx.adminPanel.addSidebarItem({icon: 'user', title: 'User Management', href: '/admin/users'})
            // ctx.adminPanel.addAdminPage(routePrefix, "index", {sidebarItems, headerItems})
            // ctx.addPage('/test', view('index'), {})
            // ctx.addAdminPage('/', view('index'), req => ({}))
        }
    }
}




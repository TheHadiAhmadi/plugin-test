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
                addSidebarItem: (item)=>{
                    this.sidebarItems = [...this.sidebarItems, item]
                    if(item.href){
                        const view = ctx.createView(import.meta.url, './pages');
                        ctx.addPage(routePrefix, view(item.href),{})
                    }
                    item.children?.forEach(child => {
                        const view = ctx.createView(import.meta.url, './pages');
                        ctx.addPage(routePrefix, view(child.href),{})
                        
                    });
                },
                addHeaderItem: (item)=>{
                    this.sideBarItems = [...this.sideBarItems, item]
                },
                addAdminPage: (slug, page) => {
                    // ctx.addPage(routePrefix + slug, )
                    console.log('adding admin page');
                },
            }
            const view = ctx.createView(import.meta.url, './pages');
            ctx.addPage(routePrefix, view('index'), () => ({sidebarItems, headerItems}))
            
            ctx.adminPanel.addSideBarItem({icon: 'user', title: 'User Management', href: '/admin/users'})
            // ctx.addPage('/test', view('index'), {})
            // ctx.addAdminPage('/', view('index'), req => ({}))
        }
    }
}




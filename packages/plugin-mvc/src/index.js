/**
 * @type {import(".").MvcPluginFactory}
 */
export default function(config) {
    return {
        name: 'mvc', 
        description: 'Adds basic MVC architecture..',
        /**
         * 
         * @param {import ('.').MvcContext} ctx 
         */
        init(ctx) {
            
            ctx.addController = (slug, controller) => {
                Object.keys(controller.pages ?? {}).map(key => {
                    const page = controller.pages[key]
                    
                    ctx.addPage('/' + slug + key, page.path, page.props)
                })
                                                        
                Object.keys(controller.actions ?? {}).map(key => {
                    const action = controller.actions[key]
                    ctx.addRoute('/' + slug + '/' + key, 'post', async (req, res) => {
                        const body = req.body
                        const result = await action(body)
                        res.send(result)
                    })
                })
            }

            ctx.addLayout = function (name, path) {
                // 
            }

            ctx.createView = (url, viewsFolder = './pages') => (name, props) => {
				const to = viewsFolder + '/' + name + '.svelte'

				return ctx.resolve(url, to)
			}
        }
    }
}
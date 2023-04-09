import path from "path"

/**
 * @type {() => import("@undefined/core").Plugin<any>}
 */
export default (config) => {
    return {
        name: 'todos',
        init(ctx) {
            ctx.resolve = (from, to) => {
                return path.resolve(path.dirname(from.replace('file:///', '/')), to)
            }

            ctx.addTable('todos', [
                {type: 'text', params: ['title']}, 
                {type: 'text', params: ['description']}, 
                {type: 'boolean', params: ['done']}
            ])
            
            async function getTodo(id) {
                console.log('getTodo', id)
                return await ctx.data('todos').get(id)
            }

            async function getTodoProps(params) {
                const result = {

                    todo: await getTodo(+params.id)
                }
                console.log(result)

                return result
            }
            
            ctx.addRoute('/tabler.css', 'get', (req, res) => {
                res.sendFile(ctx.resolve(import.meta.url, './tabler.min.css'));
            })
            ctx.addPage('/', ctx.resolve(import.meta.url, './views/index.svelte'), {title: 'Index page'})
            ctx.addPage('/todos', ctx.resolve(import.meta.url,'./views/todos/index.svelte'), 
            async (params) => {
                return {
                    todos: await ctx.data('todos').getAll()
                }
            })
            ctx.addPage('/todos/add', ctx.resolve(import.meta.url,'./views/todos/add.svelte'))

            ctx.addPage('/todos/:id', ctx.resolve(import.meta.url,'./views/todos/id.svelte'), getTodoProps)

            ctx.addPage('/todos/add', ctx.resolve(import.meta.url,'./views/todos/add.svelte'))
            ctx.addPage('/todos/:id/edit', ctx.resolve(import.meta.url,'./views/todos/edit.svelte'), getTodoProps)

            ctx.addRoute('/todos', 'post', (req, res) => {
                ctx.data('todos').insert(req.body)
                res.redirect('/todos')
            })
            ctx.addRoute('/todos/:id', 'delete', (req, res) => {
                ctx.data('todos').remove(+req.params.id)
                res.redirect('/todos')
            })
            ctx.addRoute('/todos/:id', 'post', (req, res) => {
                ctx.data('todos').update(req.params.id, req.body)
                res.redirect('/todos/' + req.params.id)
            })  

        }
    }

}
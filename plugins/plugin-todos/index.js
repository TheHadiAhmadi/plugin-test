/**
 * @type {() => import("@undefined/core").Plugin<any>}
 */
export default function pluginTodos(config) {
    return {
        name: 'todos',
        init(ctx) {
            console.log('addTable', 'todos')
            ctx.addTable('todos', [
                {type: 'text', params: ['title']}, 
                {type: 'text', params: ['description']}, 
                {type: 'boolean', params: ['done']}
            ])

            const resolve = ctx.createResolve(import.meta.url)
            const view = ctx.createView(import.meta.url)

            const todosController = {
                pages:  {
                    '/': {
                        path: view('todos/index'),
                        async props() {
                            const todos = await ctx.data('todos').getAll()

                            return {todos}
                        }
                    },
                    '/add': {
                        path: view('todos/add'),
                    },
                    '/:id': {
                        path: view('todos/id'),
                        async props (params) {
                            const todo = await ctx.data('todos').get(params.id)
                            return {
                                todo
                            }
                        },
                    },
                    '/:id/edit': {
                        path: view('todos/edit'),
                        async props (params) {
                            const todo = await ctx.data('todos').get(params.id)
                            return {
                                todo
                            }
                        }
                    }
                },
                actions: {
                    createTodo: async (data) => {
                        return await ctx.data('todos').insert(data)
                    },
                    editTodo: async ({id, ...data}) => {
                        return {
                            data: await ctx.data('todos').update(id, data)
                        }
                    },
                    removeTodo: async ({id}) => {
                        console.log('remove', id)
                        return {
                            data: await ctx.data('todos').remove(id)
                        }
                    }
                }
            }
            
            ctx.addController('todos', todosController)
            ctx.serve(resolve('./public'))

            ctx.addPage('/', ctx.resolve(import.meta.url, './pages/index.svelte'), {
                title: 'Index page'
            })
        }
    }
}
import { initPlugins, Plugin } from "../plugin";
import base, { BaseContext } from "../packages/plugin-base/src/plugin";
import database, { DatabaseContext } from "../packages/database";
import express, { ExpressContext } from "../packages/plugin-express/plugin";


interface CrudContext extends ExpressContext, BaseContext, DatabaseContext {
    addCrud: (tableName: string, fields: Array<{type: string, params: any[]}>) => void
}
interface CrudPlugin extends Plugin<CrudContext> {}

const crudPlugin: CrudPlugin = {
    name: 'crud-plugin',
    async init(ctx) {
        ctx.addCrud = async function (tableName, fields) {
            if(!await ctx.knex.schema.hasTable(tableName)) {
                await ctx.knex.schema.createTable(tableName, builder => {
                    builder.increments()
                    fields.map(field => {
                        builder[field.type](...field.params)
                    })
                })
            }

            ctx.addRoute('/api/' + tableName, 'get', async (req, res) => {
                const data = await ctx.knex(tableName).select('*')
                res.send(data)
            })
            ctx.addRoute('/api/' + tableName, 'post', async (req, res) => {
                const data = await ctx.knex(tableName).insert(req.body)
                res.send(data)
            })
            ctx.addRoute('/api/' + tableName + '/:id', 'get', async (req, res) => {
                const data = await ctx.knex(tableName).select("*").where({id: req.params.id}).first()
                res.send(data)
            })
            ctx.addRoute('/api/' + tableName + '/:id', 'put', async (req, res) => {
                const data = await ctx.knex(tableName).update(req.body).where({id: req.params.id})
                res.send(data)
            })

            ctx.addRoute('/api/' + tableName + '/:id', 'delete', async (req, res) => {
                const data = await ctx.knex(tableName).delete().where({id: req.params.id})
                res.send(data)
            })
        }
    }
}


interface MyContext extends CrudContext {}
interface MyPlugin extends Plugin<MyContext> {}
const myPlugin: MyPlugin = {
    name: 'my-plugin',
    async init(ctx) {
        ctx.addCrud('users', [
            {type: 'string', params: ['name']},
            {type: 'string', params: ['email']},
            {type: 'string', params: ['username']},
        ])

        ctx.addCrud('todos', [
            {type: 'string', params: ['title']},
            {type: 'boolean', params: ['isDone']},
            {type: 'string', params: ['description']},
        ])

    }
}

initPlugins([
    express({port: 3001}),
    base(  {}),
    database({development: {
        client: 'sqlite3',
        connection: './test.db'
    }}),
    crudPlugin,
    myPlugin
])
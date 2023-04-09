import knex from 'knex'


/**
 * 
 * @type {import('./plugin').default} 
 */
export default function(config) {
    return {
        name: 'knex', 
        description: 'Add knex query builder to ctx',
        init(ctx) {

            ctx.db = knex({
                client: config.client,
                connection: config.connection
            })
            
            ctx.addTable = async (tableName, columns) => {
                if(!await ctx.db.schema.hasTable(tableName)) {
                    await ctx.db.schema.createTable(tableName, builder => {
                        builder.increments()
                        columns.map(column => {
                            builder[column.type](...column.params)
                        })
                    })
                }
            }
            ctx.removeTable = async (tableName) => {
                if(await ctx.db.schema.hasTable(tableName)) {
                    await ctx.db.schema.removeTable(tableName)
                }
            }

            ctx.data = (tableName) => ({
                insert: async (data) => {
                    return await ctx.db(tableName).insert(data)
                },
                remove: async (id) => {
                    return await ctx.db(tableName).delete().where({id})
                },
                update: async (id, data) => {
                    return await ctx.db(tableName).update(data).where({id})
                },
                get: async (id) => {
                    return await ctx.db(tableName).select("*").where({id}).first()
                },
                getAll: async () => {
                    return await ctx.db(tableName).select("*")
                }
            })
        }
    }
}
import { Context, Plugin } from "../plugin";
import knex, { Knex } from 'knex';

export interface DatabaseConfig {
    development: {
        client: 'mysql' | 'pg' | 'sqlite3',
        connection: string | {}
    },
    production?: {
        client: 'mysql' | 'pg' | 'sqlite3',
        connection: string | {}
    }
}

export interface DatabaseContext extends Context {
    knex: Knex
}
export interface DatabasePlugin extends Plugin<DatabaseContext> {
    // 
}

export default function(config: DatabaseConfig): DatabasePlugin {
    const db = knex({
        client: config.development.client,
        connection: config.development.connection
        // connection: config.development
        // development: config.development,
        // production: config.production
    });

    return {
        name: 'database',
        description: 'Database Connection',
        init(ctx) {
            ctx.addCtx('knex', db);
        }
    }
}

// import { Context, Plugin } from "../plugin"
// import { BaseContext } from "./base"

// const data = {}

// export interface DatabaseContext extends BaseContext {
// // 
// }

// export interface DatabasePlugin extends Plugin<DatabaseContext> {

// }

// export interface DatabaseConfig {
//     // 
// }

// export default function(config: DatabaseConfig): DatabasePlugin {
//     return {

//         name: 'database',
//         init(ctx) {
//             // ctx.
//             ctx.addCtx('db', (table) => ({    
//                 query() {
//                     ctx.runHook('db', {type: 'query', table})
//                     return ctx.runFilter('db:query', data[table] ?? [])
//                 },
//                 insert(row) {
//                     ctx.runHook('db', {type: 'insert', table, row})

//                     data[table] ??=[]
//                     data[table].push(row)
//                     return ctx.runFilter('db:insert', row)
//                 }  
//             }))
//         }
//     }
// }
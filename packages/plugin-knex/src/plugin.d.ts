import { Plugin } from "@undefined/plugin"
import { BaseContext } from '@undefined/plugin-base'
import {Knex} from 'knex'

export interface KnexContext extends BaseContext {
    // 
    db: Knex
    addTable: (tableName: string, columns: any[]) => void
    removeTable: (tableName: string) => void
    data: (tableName: string) => {
        insert: (value: any) => any
        remove: (id: number) => any
        update: (id: number, value: any) => any
        get: (id: number) => any
        getAll: (tableName: string) => any[]
    }

}

export type KnexPlugin = Plugin<KnexContext>

export interface KnexConfig {
    client: string,
    connection: string
}

export type BasePluginFactory = (config: BaseConfig) => KnexPlugin
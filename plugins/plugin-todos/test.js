import { init } from "@undefined/core"
import knex from '@undefined/plugin-knex'
import express from '@undefined/plugin-express'
import base from '@undefined/plugin-base'
import svelte from '@undefined/plugin-svelte'
import mvc from '@undefined/plugin-mvc'
import pluginTodos from './index.js'

init([express({port: 3001}), base(), knex({
    client: 'sqlite3',
    connection: './data/test.db'
}), svelte(), mvc(), pluginTodos()])
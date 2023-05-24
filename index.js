import {init} from "@undefined/core";
import base from "@undefined/plugin-base";
import express from "@undefined/plugin-express";
import cache from "@undefined/plugin-cache";
import svelte from "@undefined/plugin-svelte";
import knex from "@undefined/plugin-knex";
import mvc from "@undefined/plugin-mvc";
import pluginTodos from "./plugins/plugin-todos/index.js";
import model from './packages/plugin-model/src/index.js'
import admin from './packages/plugin-admin-svelte/src/index.js'

const plugins = [
    // Base Plugins
    express({port: 3001}),
    // knex({
    //     connection: './test.db',
    //     client: 'sqlite3'
    // }),
    model({}),
    base({}),
    cache(),
    svelte({}),
    mvc(),
    admin(),
    // User plugins
    
    // pluginTodos()
]

init(plugins)
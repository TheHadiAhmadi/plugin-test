import {init} from '@undefined/core'
import express from '@undefined/plugin-express'
import base from '@undefined/plugin-base'
import svelte from '@undefined/plugin-svelte'
import mvc from '@undefined/plugin-mvc'
import cache from '@undefined/plugin-cache'
import adminPanel from './src/index.js'

init([
    express({port: 3001}),
    base(),
    cache(),
    svelte(),
    mvc(),
    adminPanel()
])
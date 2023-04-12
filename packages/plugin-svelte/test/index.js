import {init} from '@undefined/core'
import express from '@undefined/plugin-express'
import base from '@undefined/plugin-base'
import svelte from '../src/index.js'

init([
    // express({}),
    // base(),
    svelte(), 
    {
        name: 'test',
        async init(ctx) {
            ctx.svelte.compile('/home/hadi/git/plugin-test/packages/plugin-svelte/test/Test.svelte', 'test.svelte')

            console.log(await ctx.svelte.dom('test.svelte', {a: 2}))

        }
    }
])
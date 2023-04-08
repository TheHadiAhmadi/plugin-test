import { initPlugins, Plugin } from "./lib/plugin";
import base from "./plugins/base";
import express from "./plugins/express";
import svelte from "./plugins/svelte";

const plugins: Plugin[] = [
    express({port: 3001}),
    base({}),
    svelte(),
    {
        name: 'app',
        init(ctx) {
            ctx.addPage('/test', './useless/Test.svelte', {name: 'HADI'})
        }
    }
]

initPlugins(plugins)
import express from 'express'
import { Plugin } from "../lib/plugin"
import { ExpressContext } from './express'

export interface BaseContext extends ExpressContext {
    // 
}

export interface BasePlugin extends Plugin<BaseContext> {}
interface BaseConfig {
    // 
}

export default function(config: BaseConfig): BasePlugin {
    return {
        name: 'base', 
        description: 'Add some Express middlewares..',
        init(ctx) {

            ctx.addMiddleware(express.json())

            ctx.addHook('express:listen', (port: number) => {
                console.log('listening on port: ', port)
            })
        
        }
    }
}
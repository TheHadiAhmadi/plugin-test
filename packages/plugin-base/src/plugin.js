import express from 'express'

/**
 * 
 * @type {import('./plugin').default} 
 */
export default function(config) {
    return {
        name: 'base', 
        description: 'Add some Express middlewares..',
        init(ctx) {
            
            ctx.addMiddleware(express.json())
            ctx.addMiddleware(express.urlencoded({extended: true}))

            ctx.addHook('express:listen', (port) => {
                console.log('listening on port: ', port)
            })
        
        }
    }
}
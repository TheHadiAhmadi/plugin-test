import express from 'express'
import path from 'path'

/**
 * 
 * @type {import('./plugin').default} 
 */
export default function(config) {
    return {
        name: 'base', 
        description: 'Add some Express middlewares..',
        init(ctx) {
            ctx.resolve = (url, file) => {
                console.log('url: ===?', url)
                console.log('file: ===?', file)
                return path.resolve(path.dirname(url.replace('file:///', '')), file)
            }

            ctx.createResolve = (url) => (file) => ctx.resolve(url, file)
            

            ctx.serve = (folder) => {
                ctx.addMiddleware(express.static(folder))
            }

            ctx.addMiddleware(express.json())
            ctx.addMiddleware(express.urlencoded({extended: true}))

            ctx.addHook('express:listen', (port) => {
                console.log('listening on port: ', port)
            })
        
        }
    }
}
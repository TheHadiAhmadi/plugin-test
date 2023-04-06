//  import  { run, on } from './hook'
//  import  { initPlugins } from './plugin'

import { run } from "./hook";
import { initPlugins } from "./plugin";
import base from "./plugins/base";
import express from "./plugins/express";

initPlugins([
    express({port: 3001}),
    base()
])


// import express from  'express'
// import afterFrontend from './plugins/after-frontend'
// import base from './plugins/base'
// import logger from './plugins/logger'
// import database from './plugins/database'
// import users from './plugins/users'
// import frontend from './plugins/frontend'

// // initPlugins(base, database, logger, users, frontend, afterFrontend)
// initPlugins(base, logger)

// const app = express()

// run('init', app)

// app.listen(3000, () => {
//     run('listen', 3000)
// })

// on('listen', (port) => {
//     console.log('listening on port: ', port)
// })
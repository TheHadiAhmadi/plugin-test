export default (ctx) => ({
    name: 'logger',
    middlewares: [
        (req, res, next) => {
            console.log('log: ', req.method, req.url)
            ctx.db('logs').insert({
                method: req.method,
                url: req.url,
                date: new Date().toTimeString().split(' ')[0]
            })
            next()
        }
    ],
    hooks: {
        db: ({type, table, row}) => {
            try {
                ctx.db('logs_db').insert({type, table, row})
            } catch(err) {
                // ignore
            }
        }
    },
    routes: {
        'GET /dashboard': (req, res) => {
            const logs = ctx.db('logs').query()
            const logs_db = ctx.db('logs_db').query()
            res.send('Request: \n' + logs.map((log, index) => `${index} (${log.date}): ${log.method} - ${log.url}`).join('\n') + '\n\n\n\n' + JSON.stringify(logs_db))
        },
        'GET /logs': (req, res) => {
            const logs = ctx.db('logs').query()
            res.send(JSON.stringify(logs))
        },
        'GET /db-logs': (req, res) => {
            const logs_db = ctx.db('logs_db').query()
            res.send(JSON.stringify(logs_db))
        }
    },
})

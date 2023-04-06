
export function addServiceToApp(app, service, prefix) {
    if(typeof service === 'function') {
        app.post(prefix, async (req, res) => {
            const result = service(req.body)

            try {
                res.json(result)
            } catch(err) {
                res.status(500).json(err.message)
            }
        })
    }    
    Object.keys(service).map(serviceName => {
        addServiceToApp(app, service[serviceName], prefix + '/' + serviceName)                                                                                 
    })
}

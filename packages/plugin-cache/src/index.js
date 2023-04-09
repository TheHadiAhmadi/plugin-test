export default (config) => {
    return {
        name: 'cache',
        init(ctx) {
            const cache = {}
            const getCache = (key) => cache[key]
            const setCache = async (key, valuePromise) => {
                console.log('update cache', key, valuePromise)
                if(valuePromise) {
                    return valuePromise.then(value => cache[key] = value).then(() => {
                        return getCache(key)
                    })
                } else {
                    return getCache(key)
                }
            }

            ctx.getCache = getCache
            ctx.setCache = setCache
        }
    }
}

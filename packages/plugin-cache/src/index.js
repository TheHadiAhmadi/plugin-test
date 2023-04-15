import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"

export default ({folder = ".cache"} = {}) => {
    return {
        name: 'cache',
        init(ctx) {

            if(!existsSync(folder)) {
                mkdirSync(folder)
            }

            const toHash = (key) => key.replace(/\//g, '_').replace(':', '_') // key => hash
            
            
            function isPromise(p) {
                if (typeof p === 'object' && typeof p.then === 'function') {
                    return true;
                }

                return false;
            }


            const cache = {}
            const getCache = async (key) => {
                if(cache[toHash(key)]) return cache[toHash(key)]
                if(!existsSync(folder + '/' + toHash(key))) {
                    return undefined
                }
                const result = readFileSync(folder + '/' + toHash(key), 'utf-8')
                cache[toHash(key)] = result
                return result;
            }
            
            const setCache = async (key, setter) => {
                if(isPromise(setter)) {
                    await setter.then(value => {
                        cache[toHash(key)] = value
                    })
                } else if(typeof setter === 'function') {
                    cache[toHash(key)] = await setter()
                } else {
                    cache[toHash(key)] = setter
                }
                
                if(cache[toHash(key)]) {
                    writeFileSync(folder + '/' + toHash(key), cache[toHash(key)])
                }
                console.log('inside setCache')
                return cache[toHash(key)]
            }

            const useCache = async (key, value) => {
                console.log('useCache', key)
                const result = await getCache(key)
                console.log('useCache result', result)

                if(result) {
                    console.log('before setCache')
                    setCache(key, value)
                    console.log('after setCache')

                    return result;
                }

                if(!result) {
                    console.log('useCache setCache', key, value)

                    return await setCache(key, value)
                }
                return result;
            }

            ctx.getCache = getCache
            ctx.setCache = setCache
            ctx.useCache = useCache
        }
    }
}


const filters = {}
/**
 * @type {import(".").HookCallbacks}
 */
const callbacks = {}

let runningHooks = []

export function run(name, parameter) {
    if(runningHooks.filter(hook => hook === name).length < 2) { // only allow running one time
        runningHooks.push(name)

        callbacks[name]??=[]
    
        for(let callback of callbacks[name]) {
            callback(parameter)
        }
        runningHooks = runningHooks.filter(hook => hook !== name)

    } else {
        throw new Error('this Hook is already running: ' +name)
    }

}

export function on(name, callback) {
    callbacks[name] ??= []
    
    if(callbacks[name].find(cb => cb === callback)) {
        console.log('callback exists')
        throw new Error('callback for this hook exists: ' + name)
    }
    callbacks[name].push(callback)
} 

export function off(name, callback) {
    callbacks[name] ??= []
    callbacks[name] = callbacks[name].filter(cb => cb !== callback)
}

export function filter(name, defaultValue) {
    return (filters[name]??[]).reduce((prev, curr) => {
        return curr(prev)
    }, defaultValue)
}
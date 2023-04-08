

type HookParam = any
type HookCallback = (param: HookParam) => HookParam | undefined | void 
type HookCallbacks = {
    [x: string]: HookCallback[]
}

const filters: any = {}
const callbacks: HookCallbacks = {}

let runningHooks: any[] = []

export function run<T extends keyof HookCallbacks>(name: T, parameter: HookParam[]) {
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

export function on<T extends keyof HookCallbacks>(name: T, callback: HookCallback) {
    callbacks[name] ??= []
    
    if(callbacks[name].find(cb => cb === callback)) {
        console.log('callback exists')
        throw new Error('callback for this hook exists: ' + name)
    }
    callbacks[name].push(callback)
} 

export function off<T extends keyof HookCallbacks>(name: T, callback: HookCallback ) {
    callbacks[name] ??= []
    callbacks[name] = callbacks[name].filter(cb => cb !== callback)
}

export function filter(name: string, defaultValue: any) {
    return (filters[name]??[]).reduce((prev: any, curr: any) => {
        return curr(prev)
    }, defaultValue)
}
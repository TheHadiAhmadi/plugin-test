import { filter, off, on, run } from "./hook.js"


/**
 * @type {import('.').Context['addHook']}
 */
const addHook = (name, callback) => {
    on(name, callback)

    return () => {
        off(name, callback)
    }
}


/**
 * @type {import('.').Context['runHook']}
 */
const runHook = (name, params) => {
    return run(name, params)
}

/**
 * @type {import('.').Context['addFilter']}
 */
const addFilter = (name, value) => {
    return on(name, value)
}

/**
 * @type {import('.').Context['runFilter']}
 */
const runFilter = (name, value) => {
    return filter(name, value)
}

/**
 * 
 * @param {import(".").Plugin[]} plugins 
 */
export function init(plugins) {
    const ctx = {
        addHook,
        runHook,
        addFilter,
        runFilter,
    }

    const output = plugins.map(plugin => {
        addHook('plugin:init', () => {
            plugin.init(ctx)
        })
    })
    runHook('plugin:init')
}
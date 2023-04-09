import { Plugin } from "@undefined/plugin"
import { ExpressContext } from '../../plugin-express/plugin'

export interface BaseContext extends ExpressContext {
    // 
}

export type BasePlugin = Plugin<BaseContext>

export interface BaseConfig {
    // 
}


export type BasePluginFactory = (config: BaseConfig) => BasePlugin
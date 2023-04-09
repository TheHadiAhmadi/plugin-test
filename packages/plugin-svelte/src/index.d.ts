
import { Plugin } from '@undefined/core'
import { BaseContext } from '@undefined/plugin-base'

export interface SvelteContext extends BaseContext {
    addPage: (slug: string, component: string, props: Record<string, any>) => void
}

export interface SveltePlugin extends Plugin<SvelteContext> {}

export interface SvelteConfig {
    // 
}

export type SveltePluginFactory = (config: SvelteConfig) => SveltePlugin
import { Plugin } from "@undefined/core";

import { ExpressContext } from "@undefined/plugin-express";
import { SvelteContext } from "@undefined/plugin-svelte";

type Page = {
    path: string;
    props: object | Function | Promise<Function>;
};

type Action = (body: any) => Promise<any>;

type Controller = {
    pages: Record<string, Page>;
    actions: Record<string, Action>;
};

export interface MvcContext extends ExpressContext, SvelteContext {
    addController: (prefix: string, controller: Controller) => void;
    createView: (url) => (path: string, props: Page["props"]) => Page;
    // addModel: (tableName: string, columns: any) => void
    //
}

export type MvcPlugin = Plugin<MvcContext>;

export interface MvcConfig {
    //
}

export type MvcPluginFactory = (config: MvcConfig) => MvcPlugin;

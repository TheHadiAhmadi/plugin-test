export * from './lib/data-table/index.js'
export {default as Form} from './lib/form'
export * from './lib/modal'
export * from './lib/layout'
import { BaseContext } from '@undefined/plugin-base'
import { ExpressContext } from '@undefined/plugin-express'
import { MvcContext } from "@undefined/plugin-mvc"
import { type } from 'os'
import { SidebarItem } from 'yesvelte'
import { CacheContext } from '../../plugin-cache/src/index.js'

export type sideBarItem = {
    icon: any,
    title: string,
    href?: string,
    children: item[]
}
export type headerItem = {
    icon: any,
    title: string,
    href: string
}

export interface AdminContext extends 
MvcContext, 
ModelContext, 
ExpressContext, 
BaseContext, 
CacheContext {
    adminPanel: {
        sideBarItems: {
            icon: any,
            title: string,
            href?: string,
            children?: item[]
        }[],
        headerItems: {
            icon: any,
            title: string,
            href: string
        }[],
        addSideBarItems: (item: {icon: any, title: string, href?: string, children: item[]})=>void,
        addHederitems: (item: {icon: any, title: string, href: string}) =>void,
        addAdminPage: (slug, page) => void
    }
}

export interface AdminPlugin extends Plugin<AdminContext>{}
export interface AdminConfig  { }

export type AdminPluginFuctory = (config: AdminConfig) =>AdminPlugin
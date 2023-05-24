 <script>
    import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter, Dropdown,DropdownItem, DropdownMenu, El, Icon, Sidebar } from "yesvelte";
    import { createEventDispatcher, onMount } from "svelte";
    import SidebarItem from './SidebarItem.svelte'
    import { children } from "svelte/internal";
    export const sideBarItems = []
    export let compactMode = true
    export let mobileMode = false
    const dispatch = createEventDispatcher()
 
    console.log("compact", compactMode)
    //mock data for test
    sideBarItems.push(
        {
            icon:'home', title:' home', href: './',
             children: [
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
            ]
        },
        {
            icon:"home", title: 'home', href: './'
        },
        {
            icon:"box", title:"Customize", href: './'
        },
        {
            icon:"star", title:"Customize", href: './'
        },
        {
            icon:'home', title:' home', href: './',
             children: [
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
            ]
        },
        {
            icon:'home', title:' home', href: './',
             children: [
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
            ]
        },
        {
            icon:'home', title:' home', href: './',
             children: [
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
                {icon:'star', title: "pligins", href: './'},
            ]
        },
    )
</script> 

{#if !mobileMode}
    <El class='side-bar '  >
        <Sidebar  class='side-bar-wrapper {compactMode? "side-bar-wrapper-compact-mode": ''}' style='{compactMode? "overflow: visible;": ''}' theme='dark' >
            {#each sideBarItems as item}
                {#if item.children }
                    <SidebarItem on:load {compactMode} {...item}  >
                        {#each item.children as child}
                            <SidebarItem on:load {...child} ></SidebarItem>
                        {/each}
                    </SidebarItem>
                {:else}
                    <SidebarItem on:load {compactMode} {...item} />
                {/if}
            {/each}
            <slot ></slot>   
        </Sidebar> 
    </El>

{:else}
    <Modal  on:close={()=>dispatch('toggleSidebar')} show={!compactMode} title='Admin Panel' scrollable dismissible >
            <Sidebar style='position: static; width: 100%; height: 100%' theme='dark'>
                {#each sideBarItems as item}
                    {#if item.children }
                        <SidebarItem on:load {compactMode} {...item} >
                            {#each item.children as child}
                                <SidebarItem on:load {...child} ></SidebarItem>
                            {/each}
                        </SidebarItem>
                    {:else}
                        <SidebarItem on:load {compactMode} {...item} />
                    {/if}
                {/each}
            </Sidebar>
    </Modal>

{/if}
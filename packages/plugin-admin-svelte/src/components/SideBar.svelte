 <script>
    import { Button, Dropdown,DropdownItem, DropdownMenu, El, Icon, Sidebar, SidebarItem } from "yesvelte";
    import { createEventDispatcher } from "svelte";
    import { children } from "svelte/internal";
    export const sideBarItems = []
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
        }
    )

    const compactMode = true
    const dispatch = createEventDispatcher()

    const handleSidebarClick= async(href)=>{
        await fetch(href,{method: 'get'})
        .then((res)=> dispatch('content', res))
    }
    const handleFocus = ()=>{
        console.log('hot focus')

    }

</script> 

<El class='side-bar ' >
    {#if compactMode}
        <Sidebar class='side-bar-wrapper' style='' theme='dark' >
            {#each sideBarItems as item}
                <SidebarItem on:click={()=>handleSidebarClick(item.href)} icon={item.icon} title={item.title}>
                    {#if item.children}
                        {#each item.children as child}
                             <SidebarItem on:click={()=>handleSidebarClick(child.href)} icon={child.icon} title={child.title}></SidebarItem>
                        {/each}
                    {/if}
                </SidebarItem>
            {/each}
            <slot ></slot>   
        </Sidebar> 
    {:else}
        <Sidebar class='side-bar-wrapper-compact-mode' style=''  theme='dark' >
            {#each sideBarItems as item}
                <SidebarItem icon={item.icon} >
                    {#if item.children}
                        <SidebarItem icon={item.icon} title={item.title} >
                        </SidebarItem>
                    {/if}
                </SidebarItem>
                
            {/each}

    
            <slot ></slot>   
        </Sidebar>
    {/if}

   
</El>
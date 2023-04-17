<script>
    import { children } from "svelte/internal";
    import { El, SideBar, SidebarItem } from "yesvelte";
    import { createEventDispatcher } from "svelte/types/runtime/internal/lifecycle";
    export const sideBarItems = []
    const dispatch = createEventDispatcher()

    const handleSidebarClick= async(href)=>{
        await fetch(href,{method: 'get'})
        .then((res)=> dispatch('content', res))
    }

</script>

<El class='side-bar' on:content >
    <SideBar theme='dark'>
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
        
        <!-- for test -->
        
        <SidebarItem icon="home" title="Getting Started" />
	    <SidebarItem icon="box" title="Customize" />
	    <SidebarItem icon="star" title="Components" />
	    <SidebarItem active icon="user" title="User Management">
	    	<SidebarItem title="Users" />
	    	<SidebarItem active title="Roles" />
        </SidebarItem>
        <!-- -- -->
    </SideBar>
</El>
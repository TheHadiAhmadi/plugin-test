<script>
    import { createEventDispatcher } from "svelte";
    import {El, Icon, Sidebar, SidebarItem} from "yesvelte";
    export let icon = undefined
    export let title = undefined
    export let compactMode = false
    export let href = undefined
    const dispatch = createEventDispatcher()

    let exposeChildren1 = false
    let exposeChildren2= false

    let childPostion = [0,0]
    
    $: { console.log('expose childern', exposeChildren1, exposeChildren2)}

    const handleMouseEnter1 = (e)=>{
        e.preventDefault()
        childPostion =  [document.getElementsByClassName('side-bar')[0].offsetWidth-10, e.target.offsetTop]
        exposeChildren1 = true
    }
    const handleMouseEnter2 = (e)=>{
        e.preventDefault()
        exposeChildren2 = true
    }
    const handleMouseLeave1 = (e)=>{
        setTimeout(()=>{
            exposeChildren1 = false
        },100)
    }
    const handleMouseLeave2 = (e)=>{
        exposeChildren2 = false
    }

    const handleItemClick = (e)=>{
        //fetch data to app bar
        e.preventDefault()
        e.stopPropagation()
        dispatch('load', href)

    }
</script>
{#if !compactMode}
    {#if $$slots.default}
        <SidebarItem {icon} {title} on:click={handleItemClick} {...$$restProps}>
            <slot></slot>
        </SidebarItem>
    {:else}
        <SidebarItem on:click={handleItemClick} {href} {icon} {title} {...$$restProps}  />
    {/if}
{:else}
    <li class="compact-sidebar-item" >
        {#if $$slots.default }
            <div  class="icon-arrow-wrapper" on:click={handleItemClick} on:keypress={handleItemClick} on:mouseenter={handleMouseEnter1} on:mouseleave={handleMouseLeave1} >
                <Icon name={icon}></Icon>
                <svg style="{(exposeChildren1 || exposeChildren2)? 'transform: rotate(-90deg)': ''};" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"/></svg>
            </div>
            {#if exposeChildren1 || exposeChildren2}
                <div   class='  children-wrapper' style='left: {childPostion[0]}px; top: {childPostion[1]}px'  on:mouseenter={handleMouseEnter2} on:mouseleave={handleMouseLeave2}>
                    <El class=" y-app y-popover  y-app-theme-dark inner-children-wrapper">
                        <slot></slot>
                    </El>
                </div>
            {/if}
        {:else}
            <div on:click={handleItemClick} on:keypress={handleItemClick}>
                <Icon name={icon}></Icon>
            </div>
        {/if}
    </li>
{/if}



<style>

    .compact-sidebar-item{
        display: flex;
        position: relative;
        list-style-type: none;
        margin: 0.5em;
        justify-content: left;
        align-items: center;
    }
    .icon-arrow-wrapper{
        display: flex;
        flex-direction: row;
        padding: 0;
        visibility: none;
    }    
   
    .children-wrapper{
        background: none;
        position: absolute;
        flex-direction: column;
        z-index: 999;
    }
   
</style>
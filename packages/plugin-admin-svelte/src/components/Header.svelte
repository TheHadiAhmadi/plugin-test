<script>
    import {El, Offcanvas,OffcanvasBody,OffcanvasHeader,  Button, Icon} from 'yesvelte'
    import HeaderItem from './HeaderItem.svelte'
    import { createEventDispatcher } from 'svelte'
    export const headerItems = []
    export let compactMode=false
    export let mobileMode= false
    let showHeaderItems =false
    const dispatch= createEventDispatcher()

</script>
 

<El class='header' p=2  style='{ mobileMode? 'position: stick;': ''} background-color: white'>
    {#if !mobileMode}
        <El>
            <Button on:click={()=> {dispatch("toggleSidebar")}}><Icon name='menu-2'></Icon></Button>
        </El>
        <El d='flex' style='flex-direction: column'>
            
        </El>
    {:else}
        <El>
            <Button on:click={()=> {dispatch("toggleSidebar")}}><Icon name='menu-2'></Icon></Button>
        </El>
        <El d='flex' style='flex-direction: column'>
            <Button style='background: none; border: none ;box-shadow: 0 0 0 0 '  on:click={()=> showHeaderItems=!showHeaderItems}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.005 11.995v.01m0-4.01v.01m0 7.99v.01"/></svg></Button>

            <Offcanvas class='y-app-theme-dark' placement="end" autoClose backdrop  bind:show={showHeaderItems}>
                <OffcanvasHeader  title='Header Items' p=0  m=0 ></OffcanvasHeader>
                <OffcanvasBody >
                    
                </OffcanvasBody>
            </Offcanvas>
        </El>


    {/if}
</El>

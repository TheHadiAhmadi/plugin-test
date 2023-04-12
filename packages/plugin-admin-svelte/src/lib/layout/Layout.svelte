<script lang="ts">
    import AppPage from "./AppPage.svelte";
    import PageFooter from "./PageFooter.svelte";
    import PageHeader from "./PageHeader.svelte";
    import PageTitle from "./PageTitle.svelte";
    import SideBar from "./SideBar.svelte";
    import Header from "./Header.svelte";
    import Logo from "./Logo.svelte";
    import { El } from "yesvelte";
    export let compactMode:boolean= false
    


</script>


<PageHeader>
    <Header  on:onCompacktModeChange compactMode = {compactMode}>
        <slot name="headerItems"></slot>
        <!-- <Logo><slot name='logo'></slot></Logo> -->
    </Header>
</PageHeader>
<El d='flex'>
    <SideBar> 
        <slot name='sideBarItems' ></slot>
    </SideBar>
    
    <AppPage>
    <slot></slot>
    </AppPage>
    
</El>

<PageFooter> <slot name='footer'></slot></PageFooter>
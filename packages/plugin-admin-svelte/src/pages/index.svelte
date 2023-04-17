<script lang='ts'>
  import {El} from 'yesvelte'
  import Header from './../components/Header.svelte';
  import SideBar from './../components/SideBar.svelte'
  import ContentPanel from './../components/ContentPanel.svelte';

  let content:any
  export let sidebarItems: any[] = [];
  const feedContent =(event:any)=>{
    ///details
    content = event.details
  }

</script>

<svelte:head>

</svelte:head>
<El class='admin-panel'>
  <SideBar on:content={feedContent}></SideBar>
  <El class='header-content-wrapper'>
    <Header></Header>
    <ContentPanel content={content}></ContentPanel>
  </El>
</El>


{JSON.stringify(sidebarItems)}

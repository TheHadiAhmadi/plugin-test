<script>
  import { El } from "yesvelte";
  import Header from "../components/Header.svelte";
  import SideBar from "../components/SideBar.svelte";
  import ContentPanel from "../components/ContentPanel.svelte";
  import {onMount} from 'svelte'
  import {load} from './services'
  import './index.css'
  let compactMode = true
  let mobileMode = false
  let data
  
  onMount(()=>{
        let mql = window.matchMedia('(max-width: 480px)')
        mobileMode = mql.matches
        mql.addEventListener('change', (v)=>{
            mobileMode = v.matches
        })
    })
  const sidebarToggleHandler = (e)=>{
    compactMode = !compactMode
    console.log('handled compact mode', compactMode)
  }

  const handleLoad = (e)=>{
    console.log('load: =>', e.detail)
    data = load(e.detail)
  }

</script>

<El  class='admin-panel'>
  <SideBar on:load ={handleLoad}  {compactMode} {mobileMode}  on:toggleSidebar={sidebarToggleHandler}></SideBar>
  <El class='header-content-wrapper'>
    <Header {compactMode} {mobileMode} on:toggleSidebar={sidebarToggleHandler}></Header>
    <ContentPanel >
      {data}
    </ContentPanel>
  </El>
</El>
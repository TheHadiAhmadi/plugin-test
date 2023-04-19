<script>
  import { El } from "yesvelte";
  import Header from "../components/Header.svelte";
  import SideBar from "../components/SideBar.svelte";
  import ContentPanel from "../components/ContentPanel.svelte";
  import './index.css'

</script>



<El  class='admin-panel'>
  <SideBar></SideBar>
  <El class='header-content-wrapper'>
    <Header ></Header>
    <ContentPanel ></ContentPanel>
  </El>
</El>






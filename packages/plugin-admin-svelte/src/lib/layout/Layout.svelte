<script lang="ts">
  import AppPage from "./AppPage.svelte";
  import PageFooter from "./PageFooter.svelte";
  import PageHeader from "./PageHeader.svelte";
  import PageTitle from "./PageTitle.svelte";
  import SideBar from "./SideBar.svelte";
  import Header from "./Header.svelte";
  import Logo from "./Logo.svelte";
  import { El } from "yesvelte";
  export let compactMode: boolean = false;
</script>

<PageHeader>
  <Header on:onCompacktModeChange {compactMode}>
    <slot name="headerItems" />
    <!-- <Logo><slot name='logo'/></Logo> -->
  </Header>
</PageHeader>
<El d="flex">
  <SideBar>
    <slot name="sideBarItems" />
  </SideBar>

  <AppPage>
    <slot />
  </AppPage>
</El>

<PageFooter><slot name="footer" /></PageFooter>

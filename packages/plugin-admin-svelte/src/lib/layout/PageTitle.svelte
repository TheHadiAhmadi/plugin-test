<script>
  import { El } from "yesvelte";


  export const title= 'Dashboard'
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<El mb="0" tag="h1">
  <slot/>
</El>

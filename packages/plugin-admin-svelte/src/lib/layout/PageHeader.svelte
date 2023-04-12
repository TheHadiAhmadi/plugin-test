<script lang="ts">
  import { El } from "yesvelte";
  import PageTitle from "./PageTitle.svelte";
  export let title: string | undefined = undefined;
</script>

<El {...$$restProps} mb="3" pt="4" pb="0" d="flex" alignItems="center" justifyContent="between">
  {#if title}
    <PageTitle>{title}</PageTitle>
  {/if}
  <slot />
</El>

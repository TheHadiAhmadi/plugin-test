<script lang="ts">
  import { Button, El, Icon } from "yesvelte";
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher()
  export let offcanvasOpen: boolean = false;
  export let compactMode: boolean = false;
</script>

<El w="100" d='flex' px="3" mb="0" class="bg-white flex items-center h-14" borderBottom>
  <Button
    dMd="none"
    class="w-8 h-8"
    border="0"
    on:click={() => (offcanvasOpen = !offcanvasOpen)}
  >
  {offcanvasOpen}
    <Icon pack="material-symbols" name="menu" />
  </Button>
  <Button
    me='auto'
    d="none"
    dMd="flex"
    class="w-8 h-8"
    border="0"
    on:click={() => {compactMode = !compactMode; dispatch("onCompacktModeChange")}}
  >
    {#if compactMode}
      <Icon pack="material-symbols" name="menu" />
    {:else}
      <Icon pack="material-symbols" name="menu-open" />
    {/if}
  </Button>


  <slot> </slot>
</El>

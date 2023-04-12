<script lang="ts">
  import { modal } from "$lib/modal/store";
  import { Modal } from "yesvelte";
</script>

{#if $modal}
  {#key $modal.open}
    <Modal bind:show={$modal.open} {...$modal.config}>
      <svelte:component this={$modal.component} {...$modal.props} />
    </Modal>
  {/key}
{/if}

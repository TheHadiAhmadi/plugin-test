<script lang="ts">
  import Modal from "../modal/Modal.svelte";
  import { Button, El } from "yesvelte";
  import { modal } from "../modal/store";

  export let description: string = "Are you sure you want to remove this item?";
  export let title: string = "Confirm remove";
</script>

<Modal {title}>
  <El tag="h2" slot="body">{description}</El>

  <El d="flex" gap="2" slot="footer">
    <Button on:click={() => $modal.resolve(false)}>Cancel</Button>
    <Button color="primary" on:click={() => $modal.resolve(true)}>Ok</Button>
  </El>
</Modal>

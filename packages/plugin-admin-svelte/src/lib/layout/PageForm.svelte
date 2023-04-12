<script lang="ts">
    import Form from "$lib/form";
  import PageHeader from "$lib/layout/PageHeader.svelte";
  import { createEventDispatcher } from "svelte";
    import { Button, El, Icon } from "yesvelte";

    const dispatch = createEventDispatcher()

    export let values = {};
  
    export let title = ''
    export let cancelHref: string | undefined = undefined
  
  </script>

<PageHeader container="sm" {title} />
  
  <El container="sm">
      <Form bind:values mx="auto" on:submit>
        <slot/>
        <El d="flex" class="flex-row-reverse" gap="3">
            <slot name="actions">

            <Button on:click={() => dispatch('save', values)} color="primary">
                <Icon name="device-floppy"/>
                Save
            </Button>
            <Button on:click={() => dispatch('cancel')} href={cancelHref} color="secondary" ghost>Cancel</Button>
        </slot>
        </El>
      </Form>
  </El>
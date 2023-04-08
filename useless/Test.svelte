<script>
  import Name from "./Name.svelte";
  import {Button} from 'yesvelte';

    export let name = 'World'
</script>

<svelte:head>
    <title>TITLE</title>
</svelte:head>

<div>
    Hello {name}
    <Name>{name}</Name>!
</div>

<Button on:click={console.log}>yesvelte</Button>

<style>
    div {
        color: red;
    }
</style>
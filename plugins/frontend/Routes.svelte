<script>
    import Test from '@cms/Test.svelte'
    import {Router, Route} from 'svelte-navigator'
    
    import { onMount } from 'svelte';
    
    let routes; 
  
    onMount(() => {

        routes = fetch('/api/Routes', {method: 'POST'}).then(res => res.json())
        
    })
    
</script>

{#await routes then routesResolved}
<Router>
    {JSON.stringify(routesResolved)}
    <!-- {#each routesResolved as route} -->

    <!-- {/each} -->
</Router>
{/await}
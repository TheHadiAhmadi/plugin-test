<script>
    import { El } from 'yesvelte/el' 
    import { Button } from 'yesvelte/button' 
    import { Card, CardActions, CardBody, CardFooter } from 'yesvelte/card'
    
    
    export let todo = undefined

    function reomveTodo() {
        fetch('/todos/removeTodo', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                id: todo.id
            })
        }).then(res => {
            window.location.pathname = '/todos'
        })
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="/tabler.min.css">
</svelte:head>
<El p="5" h="100" w="100" d="flex" alignItems="center" justifyContent="center">

{#if todo}
    <Card title="{todo.title}">
        <CardBody>
            {todo.description}
        </CardBody>
        <CardFooter>    
            <CardActions>
                <Button href="/todos">Back</Button>
                <Button color="red" on:click={reomveTodo}>Remove</Button>
            </CardActions>
        </CardFooter>
    </Card>
{:else}
<Card title="Not Found">
    <CardBody>
        <CardBody>
            this Todo item is not available
        </CardBody>
    </CardBody>
    <CardFooter>
        <CardActions>
            <Button href="..">Back</Button>
        </CardActions>
    </CardFooter>
</Card>
{/if}
</El>

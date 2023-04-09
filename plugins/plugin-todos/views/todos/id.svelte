<script>
    import {El, Button, Card, CardActions, CardBody, CardFooter} from 'yesvelte'
    export let todo = undefined

    function reomveTodo() {
        fetch('/todos/' + todo.id, { method: 'DELETE'}).then(res => {
            window.location.pathname = '/todos'
        })
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="/tabler.css">
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

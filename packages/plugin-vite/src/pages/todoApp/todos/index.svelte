<script>
    export let todos = []

    function onDone(id) {
        fetch('/todos/' + id, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({done: true})
        }).then(res => {
            todos = todos.map(todo => {
                if(todo.id === id) return {...todo, done: true}
                return todo
            })
        })
    }
</script>
<h1>List of todos</h1>
<a href="/todos/add">Add Todo</a>

<ul>
    {#each todos as todo}
        <li>{todo.id} - {todo.title} [ {#if !todo.done} <button on:click={() => onDone(todo.id)}>Done</button> - {/if} <a href="/todos/{todo.id}">View</a> - <a href="/todos/{todo.id}/edit">Edit</a> ]</li>
    {/each}
</ul>

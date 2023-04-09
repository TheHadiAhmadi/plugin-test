<script>
    export let todo = undefined
</script>
{#if todo}
<form method="post" action="/todos/{todo.id}">
    <input name="title" value={todo.title}/>
    <textarea name="description" value={todo.description} />
{todo.done}
    <input type="checkbox" name="done" value={todo.done === 1} />
    <button type="reset">Cancel</button>
    <button>Edit</button>
</form>
{:else}
    <h1>TODO not found <a href="/todos">Go Back</a></h1>
{/if}

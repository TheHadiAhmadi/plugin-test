<script>
  import { Form } from "@undefined/plugin-admin-svelte";
  import { Card, CardActions, CardBody, CardFooter } from "yesvelte/card";
  import { Textarea } from "yesvelte/textarea";
  import { Switch } from "yesvelte/switch";
  import { Button } from "yesvelte/button";

  let description = ""
  let done = false
    
</script>
<svelte:head>
    <link rel="stylesheet" href="/tabler.min.css"/>
</svelte:head>
<Form method="post" action="/todos/createTodo">
    <Card title="Add Todo item">
        <CardBody>
            <Form.Input name="title" />
            <Form.Field label="description" name="description" bind:value={description}>
                <Textarea bind:value={description}/>
            </Form.Field>
            <Form.Field name="done" bind:value={done}>
                <Switch bind:vlaue={done}>Done</Switch>
            </Form.Field>
        </CardBody>
        <CardFooter>
            <CardActions>
                <Button type="reset">Cancel</Button>
                <Button color="primary">Add</Button>
            </CardActions>
        </CardFooter>
    </Card>
</Form>

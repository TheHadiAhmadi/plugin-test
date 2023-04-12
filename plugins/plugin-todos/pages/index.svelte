<script lang="ts">
    import {Button} from 'yesvelte/button'
    import { Form } from '@undefined/plugin-admin-svelte'
  import { Accordions, Accordion, AccordionBody, AccordionHeader } from 'yesvelte/accordion';

    console.log(Form)
    function onsubmit({detail}) {
        // 
        console.log({detail})
    }
    export let title: string;
</script>

<svelte:head>
    <link rel="stylesheet" href="/tabler.min.css"/>
</svelte:head>

<h1>{title}</h1>
<p>Simple todo app</p>
<a href="/todos">List of todos</a>
<a href="/todos/add">Add new todo</a>

<Accordions>

<Accordion>
    <AccordionHeader>OPEN FORM</AccordionHeader>
    <AccordionBody>

        <Form on:submit={onsubmit}>
            <Form.Input name="test"/>
            <Form.Input name="test2"/>
            <Button type="submit">Submit</Button>
        </Form>
    </AccordionBody>
</Accordion>
</Accordions>

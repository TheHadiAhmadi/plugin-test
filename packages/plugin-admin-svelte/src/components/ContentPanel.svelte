<script>
    import {El} from 'yesvelte'
    export const content = undefined

</script>

<El class='content-panel'>
    <h2>content of the admin</h2>
    {#if content}
        {content}
    {/if}
    <slot></slot>
</El>

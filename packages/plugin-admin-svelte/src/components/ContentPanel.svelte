<script>
    import {El} from 'yesvelte'
    export const content = undefined

</script>

<El class='content-panel'>
    {#if content}
        {content}
    {/if}
    <slot></slot>
</El>

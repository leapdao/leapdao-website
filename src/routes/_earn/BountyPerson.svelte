<script>
  export let person;
  export let showShare = true;
</script>

{#if person}
  {#if person.html_url}
    <a href="{person.html_url}">{person.login}</a>
  {:else}
    {person.login}
  {/if}
  {#if showShare && person.share}
    {person.share} {person.unit}
  {/if}
{/if}

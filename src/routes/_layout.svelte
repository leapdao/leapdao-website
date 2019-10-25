<script>
  import Nav from '../components/Nav.svelte';
  import SubscribeForm from '../components/SubscribeForm.svelte';
  import Amoebe from '../components/Amoebe.svelte';

  export let segment;

  $: className = {
    blog: ''
  }[segment] || 'community';
</script>

<div class="page {className}">
  <slot></slot>
  <footer class="footer">
    <SubscribeForm />
  </footer>
</div>

<Amoebe />
<Nav {segment} />

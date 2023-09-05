<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './lib/Home.svelte';
  import Rule from './lib/Rule.svelte';
  import Setting from './lib/Setting.svelte';
  import Play from './lib/Play.svelte';
  import End from './lib/End.svelte';

</script>

<Router>
  <Route path="/home" component={Home} />
  <Route path="/rule" component={Rule} />
  <Route path="/setting" component={Setting} />
  <Route path="/play" component={Play} />
  <Route path="/end" component={End} />
</Router>


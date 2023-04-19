<script>
  import { Router, Route } from "svelte-navigator";
  import Todos from './pages/todoApp/index.svelte'
  import Admin from '../../plugin-admin-svelte/src/pages/index.svelte'



</script>

<Router>
  <Route path='/todos/*'>
    <Todos title='mini todo'></Todos>
  </Route>
  <Route path='/admin/*'>
    <Admin></Admin>
  </Route>
</Router>



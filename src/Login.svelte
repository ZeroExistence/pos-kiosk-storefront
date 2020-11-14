<script>
import { writable } from 'svelte/store';
import { authToken, authRefreshToken, authStatus, login } from './utils/auth.js';
let userCredentials = {};
let promise;

function triggerLogin() {
  promise = login(userCredentials)
}

</script>

{#if !$authStatus}
<p>Welcome. Login Below</p>
<input bind:value={userCredentials.username}>
<input bind:value={userCredentials.password}>
<button on:click={triggerLogin}>
Login
</button>
<p>{JSON.stringify($authToken)}</p>
<p>{JSON.stringify($authRefreshToken)}</p>
<p>{JSON.stringify(userCredentials)}</p>
{:else}
<p>Login Successful</p>
{/if}

<script>
  import { onMount } from 'svelte';
  import { authToken } from './utils/auth.js';

  let items = []
  let search = ''

  onMount(async () => {
    const url = 'http://localhost:8000/api/item/'
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+$authToken
      }
    }).then(r => r.json())
    .then(data => {
      items = data;
    })
  })

  function addItem() {

  }

  async function getItems() {
    const url = `http://localhost:8000/api/item/?search=${search}`
    await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${$authToken}`
      }
    }).then(r => r.json())
    .then(data => {
      items = data;
    })
  }

</script>

{#if items}
<input bind:value={search}>
<button on:click={getItems}>
Search Item
</button>
<table>
<tr>
<th>Item</th>
<th>Variant</th>
<th>Price</th>
<th>Order</th>
</tr>
{#each items as item (item.pk)}
<tr>
<td>{item.product}</td>
<td>{#each item.variant as variant} {variant.name}: {variant.type} |{/each}</td>
<td>{item.price}</td>
<td><input type=number bind:value={item.quantity}></td>
<td>Total: {item.price * item.quantity}</td>
{#if item.quantity}<td><button on:click={addItem(item)}>Add to Cart</button></td>{/if}
</tr>
{/each}
</table>
{/if}

<script lang="ts">
	import type { Snippet } from 'svelte'
	import '../style.css'

	let { children }: { children: Snippet } = $props()
</script>

{@render children()}

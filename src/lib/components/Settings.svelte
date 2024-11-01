<script lang="ts">
	let { width = 8, height = 8, seed }: { width?: number; height?: number; seed: number } = $props()
</script>

<header>
	<form action="/" data-sveltekit-reload>
		<div class="input">
			<label for="width">Width {width}</label>
			<input type="range" name="width" bind:value={width} id="width" required min="4" max="24" />
		</div>
		<div class="input">
			<label for="height">Height {height}</label>
			<input type="range" name="height" bind:value={height} id="height" required min="1" max="24" />
		</div>
		<div class="input" style="margin-right:auto;">
			<label for="seed">Seed : </label>
			<input type="number" name="seed" bind:value={seed} id="seed" required min="1" />
		</div>
		<button>Generate</button>
	</form>
</header>

<style>
	header {
		padding: 0.8rem 1rem;
		background-color: var(--oc-gray-4);
	}
	form {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.input {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
</style>

<script lang="ts">
	let { width = 8, height = 8, seed }: { width?: number; height?: number; seed: number } = $props()
	let translateY = $state(0)
	let elementHeight = $state(0)
	let scrollY = $state(0)
	let prevScroolY = $state(0)
	function onscroll() {
		const maxScroll =
			Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			) - window.innerHeight
		if (window.scrollY < 0 || window.scrollY > maxScroll) {
			return
		}
		console.log(maxScroll, scrollY)
		scrollY = window.scrollY
		const diff = scrollY - prevScroolY
		translateY = Math.max(0, Math.min(translateY + diff, elementHeight))
		prevScroolY = scrollY
	}
</script>

<svelte:window {onscroll} />

<header bind:clientHeight={elementHeight} style="transform:translateY(-{translateY}px)">
	<form action="/" data-sveltekit-reload>
		<div class="input">
			<label for="width">Width {width}</label>
			<input type="range" name="width" bind:value={width} id="width" required min="4" max="24" />
		</div>
		<div class="input">
			<label for="height">Height {height}</label>
			<input type="range" name="height" bind:value={height} id="height" required min="4" max="24" />
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
		position: sticky;
		top: 0;
		padding: 0.8rem 1rem;
		background-color: var(--oc-gray-5);
	}
	form {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.input {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		flex-grow: 1;
	}
	button {
		align-self: flex-end;
	}
</style>

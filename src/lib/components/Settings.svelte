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

	input[type='number'] {
		background-color: var(--oc-gray-3);
		border: 1px solid var(--oc-gray-6);
		padding: 0.2rem 0.6rem;
	}

	input[type='number']:focus-visible {
		background-color: var(--oc-gray-1);
		border: 1px solid var(--oc-gray-8);
		outline: 0;
	}

	input[type='range'] {
		margin-block-start: var(--space-3xs);
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
		width: 100%;
		vertical-align: middle;
		--_thumb-width: 0.3rem;
		--_thumb-height: 1.2rem;
		--_track-height: 1rem;
		--_track-padding: 0.2rem;
		--_bg: var(--oc-gray-3);
		border-radius: 999999em;
	}

	input:focus-visible {
		outline: 2px solid currentColor;
	}

	input[type='range']::-webkit-slider-runnable-track {
		background-image: linear-gradient(
			transparent var(--_track-padding),
			var(--_bg) var(--_track-padding),
			var(--_bg) calc(100% - var(--_track-padding)),
			transparent calc(100% - var(--_track-padding))
		);
		height: var(--_track-height);
		border-radius: 999999em;
	}

	input[type='range']::-moz-range-track {
		background-color: var(--_bg);
		height: calc(var(--_track-height) - var(--_track-padding) * 2);
		border-radius: 999999em;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		margin-top: calc(-0.5 * var(--_thumb-height) + 0.5 * var(--_track-height));
		background-color: var(--oc-gray-8);
		height: var(--_thumb-height);
		width: var(--_thumb-width);
		border-radius: 999999999em;
	}

	input[type='range']::-moz-range-thumb {
		border: none;
		border-radius: 0;
		background-color: var(--oc-gray-8);
		height: var(--_thumb-height);
		width: var(--_thumb-width);
		border-radius: 999999999em;
	}
</style>

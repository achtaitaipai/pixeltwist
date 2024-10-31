<script lang="ts">
	import { Sprite } from '$lib/Sprite'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	let canvas: HTMLCanvasElement
	const sprite = new Sprite(data)

	$effect(() => {
		sprite.render(canvas)
	})
</script>

<main>
	<div class="canvasWrapper">
		<canvas bind:this={canvas}></canvas>
	</div>
	<aside>
		<h3>Les Boutons</h3>
	</aside>
</main>

<style>
	main {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.canvasWrapper {
		width: 100%;
		height: 100%;
		padding: 2rem;
		min-height: 0;
	}
	canvas {
		width: 100%;
		height: 100%;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
		object-fit: contain;
	}
	aside {
		padding: 1rem;
		flex-shrink: 0;
		background-color: var(--oc-gray-1);
	}
</style>

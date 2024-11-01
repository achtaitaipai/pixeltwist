<script lang="ts">
	import { Sprite } from '$lib/Sprite'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	let canvas: HTMLCanvasElement
	const sprite = new Sprite({ width: data.width, height: data.height, seed: data.seed })

	$effect(() => {
		sprite.render(canvas)
	})

	function rotate() {
		sprite.rotate()
		sprite.render(canvas)
	}

	function mirrorX() {
		sprite.mirrorX()
		sprite.render(canvas)
	}

	function mirrorY() {
		sprite.mirrorY()
		sprite.render(canvas)
	}

	function copyCode() {
		navigator.clipboard.writeText(sprite.code)
	}

	function download() {
		const url = canvas.toDataURL()
		const link = document.createElement('a')
		link.href = url
		link.download = 'sprite.png'
		link.click()
		link.remove()
	}
</script>

<main>
	<nav>
		<a href="/?seed={data.pageseed}" aria-label="close">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
			</svg>
		</a>
	</nav>
	<div class="canvasWrapper">
		<canvas bind:this={canvas}></canvas>
	</div>
	<aside>
		<div class="btns">
			<button onclick={rotate}>Rotate</button>
			<button onclick={mirrorY}>MirrorY</button>
			<button onclick={mirrorX}>MirrorX</button>
		</div>
		<div class="btns">
			<button onclick={copyCode}>Copy code</button>
			<button onclick={download}>Download as png</button>
		</div>
	</aside>
</main>

<style>
	main {
		height: 100vh;
		height: 100svh;
		display: flex;
		flex-direction: column;
	}
	nav {
		position: fixed;
		top: 0.25rem;
		right: 0.5rem;
		a {
			font-size: 2rem;
			text-decoration: none;
			color: inherit;
		}
		svg {
			width: 1em;
			height: 1em;
		}
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
		background-color: var(--oc-gray-5);
	}
	aside {
		padding: 1rem;
		flex-shrink: 0;
		background-color: var(--oc-gray-4);
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.btns {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>

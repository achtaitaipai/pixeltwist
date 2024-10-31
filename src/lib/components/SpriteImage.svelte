<script lang="ts">
	import { Sprite, type SpriteParams } from '../Sprite'

	const params: SpriteParams = $props()
	const sprite = new Sprite(params)
	let canvas: HTMLCanvasElement

	$effect(() => {
		sprite.render(canvas)
	})
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		width: 100px;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}
</style>

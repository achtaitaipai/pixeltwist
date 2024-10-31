<script lang="ts">
	import { Random } from '$lib/Random'
	import ScrollSpy from '$lib/components/ScrollSpy.svelte'
	import SpriteImage from '$lib/components/SpriteImage.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	const { width, height, seed } = data
	const random = new Random(seed)

	let seeds = $state(getSeeds(96))

	function getSeeds(count: number) {
		return Array.from({ length: count }, () => random.int(0xfffffff))
	}

	function getUrl(seed: number) {
		let url = '/sprites/' + seed
		if (!width && !height) return url
		url += '?'
		if (width) url += '&width=' + width
		if (height) url += '&height=' + height
		return url
	}
</script>

<main>
	{#each seeds as seed}
		<a href={getUrl(seed)}>
			<SpriteImage {width} {height} {seed} />
		</a>
	{/each}
	<ScrollSpy callback={() => (seeds = [...seeds, ...getSeeds(96)])} />
</main>

<style>
	main {
		padding: 3rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
		align-items: center;
		justify-items: center;
		gap: 6rem;
	}
</style>

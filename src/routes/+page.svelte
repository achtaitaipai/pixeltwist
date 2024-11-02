<script lang="ts">
	import { Random } from '$lib/Random'
	import ScrollSpy from '$lib/components/ScrollSpy.svelte'
	import Settings from '$lib/components/Settings.svelte'
	import SpriteImage from '$lib/components/SpriteImage.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	const { width, height, pageSeed, length } = data
	const random = new Random(pageSeed)

	let seeds: number[] = $state(getSeeds(length))

	function getSeeds(count: number) {
		return Array.from({ length: count }, () => random.int(0xfffffff))
	}

	function getUrl(seed: number) {
		let url = '/sprites/' + seed + '?pageseed=' + pageSeed + '&length=' + seeds.length
		if (!width && !height) return url
		if (width) url += '&width=' + width
		if (height) url += '&height=' + height
		return url
	}
</script>

<Settings {width} {height} seed={pageSeed} />
<main>
	{#each seeds as seed}
		<a href={getUrl(seed)} id={seed.toString()}>
			<SpriteImage {width} {height} {seed} />
		</a>
	{/each}
	<ScrollSpy callback={() => (seeds = [...seeds, ...getSeeds(96)])} />
</main>

<style>
	main {
		background-color: var(--oc-gray-5);
		padding: 3rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
		align-items: center;
		justify-items: center;
		gap: 6rem;
	}
	a {
		scroll-margin-top: 50vh;
		scroll-margin-top: 50svh;
	}
</style>

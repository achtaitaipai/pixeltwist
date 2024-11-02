<script lang="ts">
	import Settings from '$lib/components/Settings.svelte'
	import SpriteImage from '$lib/components/SpriteImage.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	const { width, height, pageSeed, pageIndex } = data

	const SPRITESBYPAGE = 396

	let seeds: number[] = $state(getSeeds(SPRITESBYPAGE, pageSeed + SPRITESBYPAGE * pageIndex))

	function getSeeds(count: number, start = 1) {
		return Array.from({ length: count }, (_, i) => i + start)
	}

	function getUrl(seed: number) {
		let url = '/sprites/' + seed + '?pageseed=' + pageSeed + '&page=' + pageIndex
		if (!width && !height) return url
		if (width) url += '&width=' + width
		if (height) url += '&height=' + height
		return url
	}
</script>

<main>
	<Settings {width} {height} seed={pageSeed} />
	<div class="grid">
		{#each seeds as seed}
			<a href={getUrl(seed)} id={seed.toString()} class="sprite">
				<SpriteImage {width} {height} {seed} />
			</a>
		{/each}
	</div>
	<nav class="pagination">
		{#if pageIndex > 0}
			<a href="/?page={pageIndex - 1}&seed={pageSeed}" data-sveltekit-reload>&leftarrow; previous</a
			>
		{/if}
		<a href="/?page={pageIndex + 1}&seed={pageSeed}" data-sveltekit-reload>next &rightarrow;</a>
	</nav>
</main>

<style>
	main {
		background-color: var(--oc-gray-5);
	}
	.grid {
		padding: 3rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
		align-items: center;
		justify-items: center;
		gap: 6rem;
	}
	.sprite {
		scroll-margin-top: 50vh;
		scroll-margin-top: 50svh;
	}
	.pagination {
		background-color: var(--oc-gray-5);
		padding: 3rem;
		display: flex;
		a {
			text-decoration: none;
			color: inherit;
		}
		a:last-child {
			margin-inline-start: auto;
		}
	}
</style>

<script lang="ts">
	let { callback }: { callback: () => void } = $props()
	let element: HTMLElement
	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const [element] = entries
				if (element.isIntersecting) callback()
			},
			{
				rootMargin: '100px'
			}
		)
		observer.observe(element)
		return () => observer.unobserve(element)
	})
</script>

<div bind:this={element}></div>

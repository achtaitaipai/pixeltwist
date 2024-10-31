import { spriteParamsSchema } from '$lib/Sprite'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ params, url }) => {
	try {
		const seed = +params.seed
		if (isNaN(seed)) error(404)
		const data = spriteParamsSchema.parse(Object.fromEntries(url.searchParams.entries()))
		return { ...data, seed }
	} catch (e) {
		error(400)
	}
}

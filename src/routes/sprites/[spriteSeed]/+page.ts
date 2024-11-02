import { spriteParamsSchema } from '$lib/Sprite'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { z } from 'zod'

const schema = spriteParamsSchema.extend({
	pageseed: z.coerce.number(),
	page: z.coerce.number()
})

export const load: PageLoad = ({ params, url }) => {
	try {
		const spriteSeed = +params.spriteSeed
		if (isNaN(spriteSeed)) error(404)
		const data = schema.parse(Object.fromEntries(url.searchParams.entries()))
		return { ...data, seed: spriteSeed }
	} catch (e) {
		error(400)
	}
}

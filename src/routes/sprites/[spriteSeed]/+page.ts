import { spriteParamsSchema } from '$lib/Sprite'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { z } from 'zod'

const schema = spriteParamsSchema.extend({
	pageseed: z.coerce.number(),
	length: z.coerce.number()
})

export const load: PageLoad = ({ params, url }) => {
	try {
		const spriteSeed = +params.spriteSeed
		if (isNaN(spriteSeed)) error(404)
		const data = schema.parse(Object.fromEntries(url.searchParams.entries()))
		return { ...data, seed: spriteSeed, length: data.length }
	} catch (e) {
		error(400)
	}
}

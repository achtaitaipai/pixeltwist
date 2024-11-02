import { spriteParamsSchema } from '$lib/Sprite'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { z } from 'zod'

const schema = spriteParamsSchema.extend({
	length: z.coerce.number().optional()
})
export const load: PageLoad = ({ url }) => {
	try {
		const {
			width,
			height,
			seed = Math.floor(Math.random() * 0xffffff),
			length = 96
		} = schema.parse(Object.fromEntries(url.searchParams.entries()))
		return { width, height, pageSeed: seed, length }
	} catch (e) {
		error(400)
	}
}

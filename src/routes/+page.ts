import { spriteParamsSchema } from '$lib/Sprite'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { z } from 'zod'

const schema = spriteParamsSchema.extend({
	page: z.coerce.number().optional()
})

export const load: PageLoad = async ({ url }) => {
	try {
		const {
			width,
			height,
			seed = Math.floor(Math.random() * 0xffffff),
			page = 0
		} = schema.parse(Object.fromEntries(url.searchParams.entries()))
		return { width, height, pageSeed: seed, pageIndex: page }
	} catch (e) {
		error(400)
	}
}

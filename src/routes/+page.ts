import { spriteParamsSchema } from '$lib/Sprite'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ url }) => {
	try {
		const {
			width,
			height,
			seed = Math.floor(Math.random() * 0xffffff)
		} = spriteParamsSchema.parse(Object.fromEntries(url.searchParams.entries()))
		return { width, height, seed }
	} catch (e) {
		error(400)
	}
}

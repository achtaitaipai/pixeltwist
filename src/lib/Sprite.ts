import { z } from 'zod'
import { colors } from './colors'
import { Random } from './Random'

export const spriteParamsSchema = z.object({
	seed: z.coerce.number().optional(),
	width: z.coerce.number().optional(),
	height: z.coerce.number().optional()
})

export type SpriteParams = z.infer<typeof spriteParamsSchema>
type Template = (x: number, y: number, width: number, height: number) => number

export class Sprite {
	#width: number
	#height: number
	#random: Random
	#template: Template
	#grid: string[][]

	constructor({ width = 8, height = 8, seed }: SpriteParams) {
		this.#width = width
		this.#height = height
		this.#random = new Random(seed)
		this.#template = this.#random.fromArray(Object.values(templates))
		this.#grid = this.#createGrid()
	}

	#createGrid() {
		let grid = Array.from({ length: this.#height }, () => Array(this.#width).fill('.'))
		let color = this.#randomColor()
		for (let y = 0; y < this.#height; y++) {
			for (let x = 0; x < this.#width / 2; x++) {
				if (this.#random.boolean(this.#template(x, y, this.#width, this.#height))) continue
				if (this.#random.boolean(0.1)) color = this.#randomColor()
				const center = Math.floor(this.#width / 2)
				grid[y][this.#width % 2 === 0 ? center - x - 1 : center - x] = color
				grid[y][center + x] = color
			}
		}

		for (let y = 0; y < this.#height; y++) {
			for (let x = 0; x < this.#width; x++) {
				let emptyNeighborCount = 0
				for (let dy = -1; dy <= 1; dy += 2) {
					for (let dx = -1; dx <= 1; dx += 2) {
						const cell = grid[y + dy]?.[x + dx]
						if (grid[y][x] === '.') continue
						if (!cell || cell === '.') emptyNeighborCount++
					}
				}
				if (emptyNeighborCount > 2) grid[y][x] = '0'
			}
		}

		return grid
	}

	#randomColor() {
		return this.#random.fromArray([1, 2, 3, 4, 5, 6, 7, 8, 9]).toString()
	}

	render(canvas: HTMLCanvasElement) {
		canvas.width = this.#width
		canvas.height = this.#height
		const ctx = canvas.getContext('2d')
		if (!ctx) throw Error("Can't access canvas' context")
		for (let y = 0; y < this.#height; y++) {
			for (let x = 0; x < this.#width; x++) {
				const cell = +this.#grid[y][x]
				if (isNaN(cell)) continue
				const color = colors[cell]
				ctx.fillStyle = color
				ctx.fillRect(x, y, 1, 1)
			}
		}
	}

	copyToClipboard() {
		let text = '`\n'
		text += this.#grid.map((r) => '\t\t' + r.join('')).join('\n')
		text += '\n\t\t`'
		navigator.clipboard.writeText(text)
	}

	download(canvas: HTMLCanvasElement) {
		const fileName = crypto.randomUUID().split('-')[0]
		const url = canvas.toDataURL()
		const link = document.createElement('a')
		link.href = url
		link.download = fileName + '.png'
		link.click()
		link.remove()
	}
}

const templates = {
	circle(x, y, w, h) {
		return Math.sqrt(x ** 2 + (h / 2 - y) ** 2) / Math.ceil(Math.sqrt((w / 2) ** 2 + (h / 2) ** 2))
	},
	losange(x, y, w, h) {
		return (x + Math.abs(h / 2 - y)) / (w / 2 + h / 2)
	},
	rect(x, _, w) {
		return x / (w / 2)
	},
	triangle(x, y) {
		return 1 - Math.atan2(y, x) / (Math.PI / 2)
	}
} as const satisfies Record<string, Template>

export class Random {
	#seed: number
	constructor(seed?: number) {
		this.#seed = seed || Math.floor(Math.random() * 0xffffffff)
	}

	#uint32() {
		this.#seed ^= this.#seed << 13
		this.#seed ^= this.#seed >>> 17
		this.#seed ^= this.#seed << 5
		this.#seed = this.#seed & 0xffffffff
		return this.#seed >>> 0
	}

	float(max = 1, min = 0) {
		return min + ((max - min) * this.#uint32()) / 0xffffffff
	}

	int(max = 10, min = 0) {
		return Math.round(this.float(max, min))
	}

	boolean(probability = 0.5) {
		return this.float() <= probability
	}

	fromArray<T>(array: T[]) {
		return array[Math.floor(this.float(array.length))]
	}
}

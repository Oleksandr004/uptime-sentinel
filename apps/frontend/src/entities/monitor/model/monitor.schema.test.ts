import { describe, it, expect } from 'vitest'
import { monitorSchema } from './monitor.schema'

describe('monitorSchema', () => {
	it('валидные данные проходят валидацию', () => {
		const validData = {
			name: 'Google Monitor',
			url: 'https://google.com',
			interval: 60,
		}

		const result = monitorSchema.safeParse(validData)

		expect(result.success).toBe(true)
	})
	it('ошибка если name короче 3 символов', () => {
		const invalidData = {
			name: 'no',
			url: 'https://google.com',
			interval: 60,
		}
		const result = monitorSchema.safeParse(invalidData)
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.format().name?._errors[0]).toBe(
				'Название должно быть не менее 3 символов'
			)
		}
	})
	it('ошибка если url невалидный', () => {
		const invalidData = {
			name: 'Test monitor',
			url: 'not-a-url',
			interval: 60,
		}

		const result = monitorSchema.safeParse(invalidData)

		expect(result.success).toBe(false)
	})
	it('ошибка если url не начинается с http/https', () => {
		const invalidData = {
			name: 'Test monitor',
			url: 'ftp://example.com',
			interval: 60,
		}

		const result = monitorSchema.safeParse(invalidData)

		expect(result.success).toBe(false)
	})

	it('ошибка если interval меньше 10', () => {
		const invalidData = {
			name: 'Test monitor',
			url: 'https://example.com',
			interval: 5,
		}

		const result = monitorSchema.safeParse(invalidData)

		expect(result.success).toBe(false)
	})

	it('ошибка если interval больше 3600', () => {
		const invalidData = {
			name: 'Test monitor',
			url: 'https://example.com',
			interval: 5000,
		}

		const result = monitorSchema.safeParse(invalidData)

		expect(result.success).toBe(false)
	})
})

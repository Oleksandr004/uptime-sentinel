import { z } from 'zod'

export const monitorSchema = z.object({
	name: z
		.string()
		.min(3, 'Название должно быть не менее 3 символов')
		.max(50, 'Название слишком длинное'),
	url: z
		.string()
		.url('Введите корректный URL адрес')
		.startsWith('http', 'URL должен начинаться с http:// или https://'),
	interval: z.number().min(10).max(3600),
})

export type MonitorFormValues = z.infer<typeof monitorSchema>

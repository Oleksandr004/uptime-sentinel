import * as z from 'zod'

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email обязателен')
		.email('Введите корректный email адрес'),
	password: z
		.string()
		.min(1, 'Пароль обязателен')
		.min(6, 'Пароль должен быть не менее 6 символов'),
})

export type LoginSchema = z.infer<typeof loginSchema>

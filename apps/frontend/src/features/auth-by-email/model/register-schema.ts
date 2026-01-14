import { z } from 'zod'

export const registerSchema = z.object({
	name: z.string().min(2, 'Имя должно быть не короче 2 символов'),
	email: z.string().email('Введите корректный email адрес'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
})

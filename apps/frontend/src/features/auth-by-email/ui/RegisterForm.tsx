'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuth } from 'app/providers/AuthProvider'
import { api } from '@/shared/api/base'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// 1. Описываем схему валидации с помощью Zod
const registerSchema = z.object({
	name: z.string().min(2, 'Имя должно быть не короче 2 символов'),
	email: z.string().email('Введите корректный email адрес'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
})

// Типизация данных формы на основе схемы
type RegisterSchema = z.infer<typeof registerSchema>

export const RegisterForm = () => {
	const [serverError, setServerError] = useState('')
	const [loading, setLoading] = useState(false)

	const { setUser } = useAuth()
	const router = useRouter()

	// 2. Инициализируем хук формы
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
	})

	const onSubmit = async (values: RegisterSchema) => {
		setLoading(true)
		setServerError('')

		try {
			const { data } = await api.post('/auth/register', values)
			setUser(data.user)
			router.push('/')
			router.refresh()
		} catch (err: any) {
			setServerError(err.response?.data?.message || 'Ошибка при регистрации')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='w-full max-w-[440px] p-8 bg-white rounded-2xl shadow-xl border border-gray-100'>
			<div className='mb-8 text-center'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>
					Создать аккаунт
				</h1>
				<p className='text-gray-500 text-sm'>
					Начните мониторинг своих сервисов за пару минут
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				{/* Поле Имя */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Имя
					</label>
					<input
						{...register('name')}
						placeholder='Иван Иванов'
						className={`w-full px-4 py-3 rounded-xl border ${
							errors.name ? 'border-red-500' : 'border-gray-200'
						} focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900`}
					/>
					{errors.name && (
						<p className='mt-1 text-xs text-red-500'>{errors.name.message}</p>
					)}
				</div>

				{/* Поле Email */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Email
					</label>
					<input
						{...register('email')}
						placeholder='name@company.com'
						className={`w-full px-4 py-3 rounded-xl border ${
							errors.email ? 'border-red-500' : 'border-gray-200'
						} focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900`}
					/>
					{errors.email && (
						<p className='mt-1 text-xs text-red-500'>{errors.email.message}</p>
					)}
				</div>

				{/* Поле Пароль */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Пароль
					</label>
					<input
						{...register('password')}
						type='password'
						placeholder='Минимум 6 символов'
						className={`w-full px-4 py-3 rounded-xl border ${
							errors.password ? 'border-red-500' : 'border-gray-200'
						} focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900`}
					/>
					{errors.password && (
						<p className='mt-1 text-xs text-red-500'>
							{errors.password.message}
						</p>
					)}
				</div>

				{serverError && (
					<div className='p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 animate-pulse'>
						{serverError}
					</div>
				)}

				<button
					type='submit'
					disabled={loading}
					className='w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-70'
				>
					{loading ? 'Создание...' : 'Зарегистрироваться'}
				</button>

				<div className='relative my-6'>
					<div className='absolute inset-0 flex items-center'>
						<span className='w-full border-t border-gray-100'></span>
					</div>
					<div className='relative flex justify-center text-xs uppercase'>
						<span className='bg-white px-2 text-gray-400'>Или</span>
					</div>
				</div>

				<button
					type='button'
					disabled
					className='w-full flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl text-gray-400 cursor-not-allowed'
				>
					Google (Скоро)
				</button>
			</form>

			<div className='mt-8 pt-6 border-t border-gray-100 text-center'>
				<p className='text-gray-600 text-sm'>
					Уже есть аккаунт?{' '}
					<Link
						href='/login'
						className='text-blue-600 font-semibold hover:underline'
					>
						Войти
					</Link>
				</p>
			</div>
		</div>
	)
}

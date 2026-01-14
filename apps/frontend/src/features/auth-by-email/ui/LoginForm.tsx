// 'use client'
// import { useState } from 'react'
// import { useAuth } from 'app/providers/AuthProvider'
// import { api } from '@/shared/api/base'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'

// export const LoginForm = () => {
// 	const [email, setEmail] = useState('')
// 	const [password, setPassword] = useState('')
// 	const [error, setError] = useState('')
// 	const [loading, setLoading] = useState(false)

// 	const { setUser } = useAuth()
// 	const router = useRouter()

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault()
// 		setLoading(true)
// 		setError('')

// 		try {
// 			const { data } = await api.post('/auth/login', { email, password })
// 			setUser(data.user)
// 			router.push('/')
// 			router.refresh()
// 		} catch (err: any) {
// 			setError(err.response?.data?.message || 'Неверный email или пароль')
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	return (
// 		<div className='w-full max-w-[400px] p-8 bg-white rounded-2xl shadow-xl border border-gray-100'>
// 			<div className='mb-8 text-center'>
// 				<h1 className='text-3xl font-bold text-gray-900 mb-2'>
// 					С возвращением
// 				</h1>
// 				<p className='text-gray-500'>
// 					Введите данные для входа в панель мониторинга
// 				</p>
// 			</div>

// 			<form onSubmit={handleSubmit} className='space-y-5'>
// 				<div>
// 					<label className='block text-sm font-medium text-gray-700 mb-1'>
// 						Email
// 					</label>
// 					<input
// 						type='email'
// 						placeholder='name@company.com'
// 						className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900'
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 						required
// 					/>
// 				</div>

// 				<div>
// 					<label className='block text-sm font-medium text-gray-700 mb-1'>
// 						Пароль
// 					</label>
// 					<input
// 						type='password'
// 						placeholder='••••••••'
// 						className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900'
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 						required
// 					/>
// 				</div>

// 				{error && (
// 					<div className='p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100'>
// 						{error}
// 					</div>
// 				)}

// 				<button
// 					type='submit'
// 					disabled={loading}
// 					className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-200 active:scale-[0.98] disabled:opacity-70'
// 				>
// 					{loading ? 'Вход...' : 'Войти в аккаунт'}
// 				</button>
// 			</form>

// 			<div className='mt-8 pt-6 border-t border-gray-100 text-center'>
// 				<p className='text-gray-600 text-sm'>
// 					Еще нет аккаунта?{' '}
// 					<Link
// 						href='/register'
// 						className='text-blue-600 font-semibold hover:underline'
// 					>
// 						Зарегистрироваться
// 					</Link>
// 				</p>
// 			</div>
// 		</div>
// 	)
// }
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from 'app/providers/AuthProvider'
import { api } from '@/shared/api/base'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loginSchema, LoginSchema } from '../model/login-schema'

export const LoginForm = () => {
	const [serverError, setServerError] = useState('')
	const [loading, setLoading] = useState(false)

	const { setUser } = useAuth()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (values: LoginSchema) => {
		setLoading(true)
		setServerError('')

		try {
			const { data } = await api.post('/auth/login', values)
			setUser(data.user)
			router.push('/')
			router.refresh()
		} catch (err: any) {
			setServerError(err.response?.data?.message || 'Неверный email или пароль')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='w-full max-w-[400px] p-8 bg-white rounded-2xl shadow-xl border border-gray-100'>
			<div className='mb-8 text-center'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>
					С возвращением
				</h1>
				<p className='text-gray-500 text-sm'>
					Введите данные для входа в панель
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Email
					</label>
					<input
						{...register('email')}
						type='email'
						placeholder='name@company.com'
						className={`w-full px-4 py-3 rounded-xl border ${
							errors.email ? 'border-red-500' : 'border-gray-200'
						} focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900`}
					/>
					{errors.email && (
						<p className='mt-1 text-xs text-red-500'>{errors.email.message}</p>
					)}
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Пароль
					</label>
					<input
						{...register('password')}
						type='password'
						placeholder='••••••••'
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
					className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-70'
				>
					{loading ? 'Вход...' : 'Войти в аккаунт'}
				</button>
			</form>

			<div className='mt-8 pt-6 border-t border-gray-100 text-center'>
				<p className='text-gray-600 text-sm'>
					Еще нет аккаунта?{' '}
					<Link
						href='/register'
						className='text-blue-600 font-semibold hover:underline'
					>
						Создать
					</Link>
				</p>
			</div>
		</div>
	)
}

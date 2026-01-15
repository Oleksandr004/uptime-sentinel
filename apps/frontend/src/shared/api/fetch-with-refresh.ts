// import { api } from '@/shared/api/base'
// import { toast } from 'sonner'

import { api } from './base'

// export const fetchWithRefresh = async (url: string, options?: any) => {
// 	try {
// 		return await api.get(url, options)
// 	} catch (err: any) {
// 		if (err.response?.status === 401) {
// 			try {
// 				// пробуем обновить accessToken
// 				await api.post('/auth/refresh')
// 				return await api.get(url, options)
// 			} catch {
// 				toast.error('Сессия истекла. Пожалуйста, войдите снова')
// 				window.location.href = '/login'
// 				throw err
// 			}
// 		}
// 		throw err
// 	}
// }
let isRefreshing = false
let failedQueue: any[] = []

export const fetchWithRefresh = async (url: string, options?: any) => {
	try {
		return await api.request({ url, ...options })
	} catch (err: any) {
		if (err.response?.status === 401 && !isRefreshing) {
			isRefreshing = true
			try {
				const { data } = await api.post('/auth/refresh') // refresh через HttpOnly куку
				// обновляем accessToken в api.defaults.headers.Authorization
				api.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`
				isRefreshing = false

				// повторяем исходный запрос
				return await api.request({ url, ...options })
			} catch (refreshErr) {
				isRefreshing = false
				throw refreshErr
			}
		}
		throw err
	}
}

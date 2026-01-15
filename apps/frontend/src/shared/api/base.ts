import axios from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
})

api.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		const serverData = error.response?.data
		const message =
			serverData?.error?.message || 'Произошла непредвиденная ошибка'
		const statusCode = serverData?.statusCode
		const isAuthMe = error.config.url.includes('/auth/me')
		if (statusCode === 429) {
			toast.error('Слишком много запросов. Подождите минуту.')
		} else if (statusCode === 401 && !isAuthMe) {
			toast.error('Сессия истекла. Войдите заново.')
		} else if (statusCode >= 400 && !isAuthMe) {
			// Показываем ошибку для всех остальных случаев (400, 403, 500)
			toast.error(Array.isArray(message) ? message[0] : message)
		}

		return Promise.reject(error)
	}
)

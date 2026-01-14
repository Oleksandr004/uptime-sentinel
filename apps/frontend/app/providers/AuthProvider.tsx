'use client'

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react'
import { api } from '@/shared/api/base'

// 1. Описываем, какие данные будут доступны в приложении
interface AuthContextType {
	user: any | null
	setUser: (user: any) => void
	logout: () => Promise<void>
	isLoading: boolean
}

// 2. Создаем сам контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const initAuth = async () => {
			try {
				// Браузер сам отправит HttpOnly куку
				const { data } = await api.get('/auth/me')
				setUser(data)
			} catch (e) {
				setUser(null)
			} finally {
				setIsLoading(false)
			}
		}
		initAuth()
	}, [])

	const logout = async () => {
		try {
			await api.post('/auth/logout')
			setUser(null)
			window.location.href = '/login'
		} catch (e) {
			console.error('Logout failed', e)
		}
	}

	return (
		<AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	)
}

// 3. Создаем хук для удобного использования в компонентах
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

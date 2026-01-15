'use client'
import { useEffect, useState } from 'react'
import { MonitorList } from '@/widgets/monitor-list/ui/monitor-list'
import { StatsOverview } from '@/widgets/stats-overview/ui/stats-overview'
import { Button } from '@/shared/ui/button'
import { ThemeToggle } from '@/shared/ui/theme-toggle'
import { Plus, Search, Filter, X, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '@/shared/api/base'
import Link from 'next/link'

import { useAuth } from './providers/AuthProvider'
import { fetchWithRefresh } from '@/shared/api/fetch-with-refresh'

interface Monitor {
	id: string
	name: string
	url: string
	status: 'UP' | 'DOWN' | 'PENDING'
	latency: number
	checks: {
		status: string
		responseTime: number
		createdAt: string
		id?: string
		statusCode?: number
	}[]
	history: { ms: number }[]
}

export default function DashboardPage() {
	const { user, logout, isLoading: isAuthLoading } = useAuth()
	const [monitors, setMonitors] = useState<Monitor[]>([])
	const [isDataLoading, setIsDataLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')
	const [filterStatus, setFilterStatus] = useState<'ALL' | 'UP' | 'DOWN'>('ALL')

	useEffect(() => {
		const fetchMonitors = async () => {
			if (!user) return
			setIsDataLoading(true)
			try {
				const res = await fetchWithRefresh('/monitors')
				let monitorsArray: Monitor[] = []

				const data = res.data

				if (Array.isArray(data)) {
					monitorsArray = data
				} else if (Array.isArray(data.monitors)) {
					monitorsArray = data.monitors
				}

				// Преобразуем каждый монитор, чтобы history всегда был массив
				monitorsArray = monitorsArray.map((m) => ({
					...m,
					history: m.checks
						? m.checks.slice(-15).map((c) => ({ ms: c.responseTime }))
						: [],
					latency:
						m.checks && m.checks.length
							? Math.round(
									m.checks.reduce((acc, c) => acc + c.responseTime, 0) /
										m.checks.length
							  )
							: 0,
				}))

				setMonitors(monitorsArray)
			} catch (err: any) {
				console.error('Ошибка загрузки:', err)
				setMonitors([])
			}
		}

		fetchMonitors()
	}, [user])

	// Фильтрация безопасно: проверяем, что массив
	const filteredMonitors = Array.isArray(monitors)
		? monitors.filter((m) => {
				const matchesSearch =
					m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					m.url.toLowerCase().includes(searchQuery.toLowerCase())
				const matchesStatus =
					filterStatus === 'ALL' || m.status === filterStatus
				return matchesSearch && matchesStatus
		  })
		: []
	if (isAuthLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500 font-medium'>
				Загрузка...
			</div>
		)
	}

	if (!user) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-black'>
				<h1 className='text-4xl font-extrabold mb-4'>Uptime Monitor</h1>
				<p className='text-gray-600 mb-8 text-center max-w-md'>
					Следите за доступностью ваших сервисов в реальном времени. Получайте
					уведомления в Telegram, когда что-то идет не так.
				</p>
				<div className='flex gap-4'>
					<Link
						href='/login'
						className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700'
					>
						Войти
					</Link>
					<Link
						href='/register'
						className='border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50'
					>
						Регистрация
					</Link>
				</div>
			</div>
		)
	}

	return (
		<main className='min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 transition-colors duration-300'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4'>
					<div className='flex items-center gap-6'>
						<div>
							<h1 className='text-3xl font-black text-slate-900 dark:text-white tracking-tight italic'>
								SENTINEL
							</h1>
							<p className='text-slate-500 dark:text-slate-400 font-medium'>
								Контроль доступности ваших ресурсов
							</p>
						</div>
					</div>

					<div className='flex items-center gap-3 w-full md:w-auto'>
						<ThemeToggle />
						<Button
							onClick={logout}
							variant='outline'
							className='rounded-xl px-4 py-6 border-slate-200 dark:border-slate-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-all group'
						>
							<LogOut
								size={20}
								className='group-hover:translate-x-0.5 transition-transform'
							/>
							<span className='hidden md:inline ml-2 font-bold'>Выйти</span>
						</Button>
						<Link href='/add' className='flex-1 md:flex-none'>
							<Button className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-6 shadow-lg shadow-blue-100 dark:shadow-none flex gap-2 transition-all active:scale-95 border-none'>
								<Plus size={20} strokeWidth={3} />
								<span className='font-bold text-white'>Новый монитор</span>
							</Button>
						</Link>
					</div>
				</div>

				<StatsOverview monitors={monitors} />

				{/* Панель поиска и фильтров */}
				<div className='mt-12 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center'>
					<div className='relative w-full md:max-w-md group'>
						<Search
							className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors'
							size={20}
						/>
						<input
							type='text'
							placeholder='Поиск по названию или URL...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full pl-12 pr-10 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 dark:text-slate-200 font-medium placeholder:text-slate-400'
						/>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery('')}
								className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
							>
								<X size={16} />
							</button>
						)}
					</div>

					<div className='flex bg-slate-200/50 dark:bg-slate-900/50 p-1.5 rounded-2xl gap-1 relative'>
						{(['ALL', 'UP', 'DOWN'] as const).map((status) => (
							<button
								key={status}
								onClick={() => setFilterStatus(status)}
								className='relative px-6 py-2 rounded-xl text-sm font-bold transition-colors z-10'
							>
								<span
									className={
										filterStatus === status
											? 'text-slate-900 dark:text-white'
											: 'text-slate-500'
									}
								>
									{status === 'ALL'
										? 'Все'
										: status === 'UP'
										? 'Online'
										: 'Offline'}
								</span>

								{/* Фоновая плашка, которая перелетает между кнопками */}
								{filterStatus === status && (
									<motion.div
										layoutId='activeTab'
										className='absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm -z-10'
										transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
									/>
								)}
							</button>
						))}
					</div>
				</div>

				{/* Список мониторов */}
				<div className='min-h-[400px]'>
					{isAuthLoading ? (
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse'>
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className='h-48 bg-slate-200 dark:bg-slate-900 rounded-2xl'
								/>
							))}
						</div>
					) : filteredMonitors.length > 0 ? (
						<MonitorList monitors={filteredMonitors} />
					) : (
						<div className='flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 transition-colors'>
							<div className='p-4 bg-slate-50 dark:bg-slate-950 rounded-full mb-4'>
								<Filter
									size={32}
									className='text-slate-300 dark:text-slate-700'
								/>
							</div>
							<h3 className='text-lg font-bold text-slate-900 dark:text-white'>
								Ничего не найдено
							</h3>
							<p className='text-slate-500 dark:text-slate-400'>
								Попробуйте изменить параметры поиска или фильтры
							</p>
						</div>
					)}
				</div>
			</div>
		</main>
	)
}

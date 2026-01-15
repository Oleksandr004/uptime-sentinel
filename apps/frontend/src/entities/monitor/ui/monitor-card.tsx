'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { io } from 'socket.io-client'
import { motion } from 'framer-motion'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import {
	Globe,
	AlertCircle,
	CheckCircle2,
	Trash2,
	ChevronRight,
} from 'lucide-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'
import { fetchWithRefresh } from '@/shared/api/fetch-with-refresh'
import { toast } from 'sonner'

interface MonitorCardProps {
	id: string
	name: string
	url: string
	status: 'UP' | 'DOWN' | 'PENDING'
	latency: number
	history: { ms: number }[]
}

export const MonitorCard = ({
	id,
	name,
	url,
	status: initialStatus,
	latency: initialLatency,
	history: initialHistory,
}: MonitorCardProps) => {
	const [currentStatus, setCurrentStatus] = useState(initialStatus)
	const [currentLatency, setCurrentLatency] = useState(initialLatency)
	const [currentHistory, setCurrentHistory] = useState(
		Array.isArray(initialHistory) ? initialHistory : []
	)

	useEffect(() => {
		const socket = io(
			process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
		)
		socket.on(
			`status_updated:${id}`,
			(data: { status: 'UP' | 'DOWN'; latency: number }) => {
				setCurrentStatus(data.status)
				setCurrentLatency(data.latency)
				setCurrentHistory((prev) => {
					const newHistory = [...prev, { ms: data.latency }]
					if (newHistory.length > 15) newHistory.shift()
					return newHistory
				})
			}
		)
		return () => {
			socket.disconnect()
		}
	}, [id])

	const handleDelete = async () => {
		try {
			const response = await fetchWithRefresh(`/monitors/${id}`, {
				method: 'DELETE',
			})

			if (response.status >= 200 && response.status < 300) {
				toast.success('Монитор удалён')
				window.location.reload()
			} else {
				toast.error('Ошибка при удалении монитора')
			}
		} catch (error) {
			console.error('Ошибка при удалении:', error)
			toast.error('Ошибка при удалении монитора')
		}
	}

	const isUp = currentStatus === 'UP'

	return (
		// Добавлены dark:bg-slate-900 dark:border-slate-800
		<motion.div
			data-testid='monitor-card'
			whileHover={{
				y: -5,
				transition: { duration: 0.2 },
			}}
			whileTap={{ scale: 0.98 }}
			className='group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md dark:hover:border-slate-700 transition-all overflow-hidden flex flex-col'
		>
			{/* Кнопка удаления */}
			<div className='absolute top-3 right-3 z-20'>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<button className='p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all'>
							<Trash2 size={18} />
						</button>
					</AlertDialogTrigger>
					<AlertDialogContent className='dark:bg-slate-900 dark:border-slate-800'>
						<AlertDialogHeader>
							<AlertDialogTitle className='dark:text-white'>
								Вы уверены?
							</AlertDialogTitle>
							<AlertDialogDescription className='dark:text-slate-400'>
								Это действие удалит мониторинг для{' '}
								<strong className='dark:text-slate-200'>{name}</strong> и всю
								историю проверок.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel className='dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'>
								Отмена
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDelete}
								className='bg-red-600 hover:bg-red-700 text-white'
							>
								Удалить
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>

			<div data-testid='monitor-card' className='p-5 flex-1 flex flex-col'>
				<Link href={`/monitor/${id}`}>
					<div className='flex items-start gap-4'>
						<div
							className={`shrink-0 p-3 rounded-lg ${
								isUp
									? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400'
									: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
							}`}
						>
							<Globe size={24} />
						</div>

						<div className='min-w-0 flex-1 pr-6'>
							<div className='flex items-center gap-1'>
								<h3
									className='font-bold text-slate-800 dark:text-slate-100 truncate'
									title={name}
								>
									{name}
								</h3>
								<ChevronRight
									size={14}
									className='text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-all'
								/>
							</div>
							<p
								className='text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5'
								title={url}
							>
								{url}
							</p>
						</div>
					</div>

					<div className='mt-6 flex items-end justify-between gap-4'>
						<div className='shrink-0'>
							<div className='flex items-center gap-2 mb-1'>
								<div
									className={`w-2 h-2 rounded-full animate-pulse ${
										isUp ? 'bg-green-500' : 'bg-red-500'
									}`}
								/>
								<p className='text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-tight'>
									Response Time
								</p>
							</div>
							<p className='text-2xl font-black text-slate-700 dark:text-slate-200'>
								{currentLatency}
								<span className='text-xs font-medium ml-1 text-slate-400 dark:text-slate-500'>
									ms
								</span>
							</p>
						</div>

						<div className='h-12 flex-1 max-w-[120px]'>
							<ResponsiveContainer width='100%' height='100%'>
								<LineChart data={currentHistory}>
									<Line
										type='monotone'
										dataKey='ms'
										// Цвета линий чуть ярче для темной темы
										stroke={isUp ? '#10b981' : '#f87171'}
										strokeWidth={2}
										dot={false}
										isAnimationActive={false}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>

					<div
						className={`mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${
							isUp
								? 'text-green-600 dark:text-green-400'
								: 'text-red-600 dark:text-red-400'
						}`}
					>
						{isUp ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
						{currentStatus}
					</div>
				</Link>
			</div>
		</motion.div>
	)
}

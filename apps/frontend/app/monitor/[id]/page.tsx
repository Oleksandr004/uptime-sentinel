'use client'

import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	AreaChart,
	Area,
} from 'recharts'
import {
	ArrowLeft,
	Activity,
	AlertTriangle,
	Zap,
	ShieldCheck,
	FileDown,
	Loader2,
} from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { exportToPDF } from '@/entities/monitor/lib/export-to-pdf'
import { cn } from '@/shared/lib/utils'
import { Metadata } from 'next'

// Константы периодов
type Period = '24h' | '7d' | '30d'
const PERIODS: { label: string; value: Period }[] = [
	{ label: '24 Часа', value: '24h' },
	{ label: 'Неделя', value: '7d' },
	{ label: 'Месяц', value: '30d' },
]

export async function generateMetadata({
	params,
}: {
	params: { id: string }
}): Promise<Metadata> {
	// Можно сделать быстрый fetch к бэкенду
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/monitors/${params.id}`
	)
	const data = await res.json()

	return {
		title: `Статистика: ${data.name || 'Монитор'}`,
		description: `Проверка доступности и график задержки для ${data.url}`,
	}
}

export default function MonitorDetailsPage() {
	const { id } = useParams()
	const [data, setData] = useState<any>(null)
	const [period, setPeriod] = useState<Period>('24h')
	const [isLoading, setIsLoading] = useState(true)
	const [isSwitching, setIsSwitching] = useState(false)

	const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

	const fetchMonitorData = useCallback(
		async (selectedPeriod: Period, isInitial = false) => {
			if (isInitial) setIsLoading(true)
			else setIsSwitching(true)

			try {
				const res = await fetch(
					`${BASE_URL}/monitors/${id}?period=${selectedPeriod}`
				)
				if (!res.ok) throw new Error('Failed to fetch')
				const json = await res.json()
				setData(json)
			} catch (error) {
				console.error('Error:', error)
			} finally {
				setIsLoading(false)
				setIsSwitching(false)
			}
		},
		[id, BASE_URL]
	)

	useEffect(() => {
		fetchMonitorData(period, true)
	}, [id, fetchMonitorData]) // Первичная загрузка

	// Обработчик смены периода
	const handlePeriodChange = (newPeriod: Period) => {
		if (newPeriod === period) return
		setPeriod(newPeriod)
		fetchMonitorData(newPeriod)
	}

	if (isLoading) {
		return (
			<div className='flex h-screen flex-col items-center justify-center gap-4 text-slate-500'>
				<Loader2 className='h-8 w-8 animate-spin text-blue-500' />
				<p className='animate-pulse font-medium'>
					Анализируем данные мониторинга...
				</p>
			</div>
		)
	}

	if (!data)
		return <div className='p-10 text-center'>Ошибка: данные не найдены</div>

	// --- Расчёт статистики ---
	const checks = data.checks || []
	const totalChecks = checks.length
	const upChecks = checks.filter((c: any) => c.status === 'UP').length
	const uptimePercentage =
		totalChecks > 0 ? ((upChecks / totalChecks) * 100).toFixed(2) : '0.00'
	const avgLatency =
		totalChecks > 0
			? Math.round(
					checks.reduce(
						(acc: number, curr: any) => acc + curr.responseTime,
						0
					) / totalChecks
			  )
			: 0
	const downEvents = checks.filter((c: any) => c.status === 'DOWN').length

	// Подготовка данных для графика
	const chartData = checks.map((c: any) => ({
		time: new Date(c.createdAt).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			...(period !== '24h' && { day: '2-digit', month: '2-digit' }),
		}),
		ms: c.responseTime,
		fullDate: new Date(c.createdAt).toLocaleString(),
		status: c.status,
	}))

	return (
		<main className='min-h-screen bg-slate-50 p-6 transition-colors duration-500 dark:bg-slate-950 md:p-12'>
			<motion.div
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				className='mx-auto max-w-6xl'
			>
				{/* Navigation */}
				<Link
					href='/'
					className='group mb-8 inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
				>
					<ArrowLeft
						size={18}
						className='transition-transform group-hover:-translate-x-1'
					/>
					Назад к дашборду
				</Link>

				{/* Header */}
				<div className='mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
					<div>
						<h1 className='text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl'>
							{data.name}
						</h1>
						<p className='mt-1 text-lg text-slate-500 dark:text-slate-400'>
							{data.url}
						</p>
					</div>

					<div className='flex flex-wrap items-center gap-3'>
						<Button
							onClick={() =>
								window.open(`${BASE_URL}/monitors/${id}/export-csv`)
							}
							variant='outline'
							className='rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900'
						>
							<FileDown size={16} className='mr-2' /> CSV
						</Button>
						<Button
							onClick={() => exportToPDF(data)}
							variant='outline'
							className='rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900'
						>
							<FileDown size={16} className='mr-2' /> PDF
						</Button>

						<div
							className={cn(
								'flex items-center gap-2 rounded-xl px-4 py-2 font-bold shadow-sm',
								data.status === 'UP'
									? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
									: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
							)}
						>
							<div
								className={cn(
									'h-2.5 w-2.5 rounded-full animate-pulse',
									data.status === 'UP' ? 'bg-green-600' : 'bg-red-600'
								)}
							/>
							{data.status}
						</div>
					</div>
				</div>

				{/* Stats Grid */}
				<div className='mb-10 grid grid-cols-1 gap-6 md:grid-cols-3'>
					{[
						{
							label: 'Доступность',
							val: `${uptimePercentage}%`,
							icon: ShieldCheck,
							color: 'text-green-600',
							bg: 'bg-green-50 dark:bg-green-900/20',
						},
						{
							label: 'Средний ответ',
							val: `${avgLatency} ms`,
							icon: Zap,
							color: 'text-blue-600',
							bg: 'bg-blue-50 dark:bg-blue-900/20',
						},
						{
							label: 'Инциденты',
							val: downEvents,
							icon: AlertTriangle,
							color: 'text-red-600',
							bg: 'bg-red-50 dark:bg-red-900/20',
						},
					].map((stat, i) => (
						<motion.div
							key={i}
							whileHover={{ y: -5 }}
							className='flex items-center gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900'
						>
							<div className={cn('rounded-2xl p-4', stat.bg, stat.color)}>
								<stat.icon size={28} />
							</div>
							<div>
								<p className='text-xs font-bold uppercase tracking-wider text-slate-400'>
									{stat.label}
								</p>
								<p className='text-3xl font-black text-slate-800 dark:text-white'>
									{stat.val}
								</p>
							</div>
						</motion.div>
					))}
				</div>

				{/* Chart Card */}
				<div className='mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
					<div className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
						<h2 className='flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white'>
							<Activity className='text-blue-500' /> История задержки
						</h2>

						{/* Selector */}
						<div className='inline-flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800'>
							{PERIODS.map((p) => (
								<button
									key={p.value}
									onClick={() => handlePeriodChange(p.value)}
									disabled={isSwitching}
									className={cn(
										'rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-200 disabled:opacity-50',
										period === p.value
											? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400'
											: 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
									)}
								>
									{p.label}
								</button>
							))}
						</div>
					</div>

					<div
						className={cn(
							'h-[350px] w-full transition-opacity duration-300',
							isSwitching && 'opacity-40'
						)}
					>
						<ResponsiveContainer width='100%' height='100%'>
							<AreaChart data={chartData}>
								<defs>
									<linearGradient id='colorMs' x1='0' y1='0' x2='0' y2='1'>
										<stop offset='5%' stopColor='#3b82f6' stopOpacity={0.3} />
										<stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray='3 3'
									vertical={false}
									stroke='#334155'
									opacity={0.1}
								/>
								<XAxis
									dataKey='time'
									stroke='#94a3b8'
									fontSize={11}
									tickLine={false}
									axisLine={false}
								/>
								<YAxis
									unit='ms'
									stroke='#94a3b8'
									fontSize={11}
									tickLine={false}
									axisLine={false}
								/>
								<Tooltip
									contentStyle={{
										background: '#0f172a',
										borderRadius: '12px',
										border: 'none',
										color: '#f8fafc',
									}}
									itemStyle={{ color: '#3b82f6' }}
									labelStyle={{ marginBottom: '4px', fontWeight: 'bold' }}
								/>
								<Area
									type='monotone'
									dataKey='ms'
									stroke='#3b82f6'
									strokeWidth={3}
									fill='url(#colorMs)'
									animationDuration={1000}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Incidents Table */}
				<div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'>
					<div className='border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/50'>
						<h2 className='flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white'>
							<AlertTriangle className='text-amber-500' /> Журнал инцидентов за
							период
						</h2>
					</div>

					<div className='overflow-x-auto'>
						<table className='w-full border-collapse text-left'>
							<thead className='bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:bg-slate-800/30'>
								<tr>
									<th className='px-6 py-4'>Дата и время</th>
									<th className='px-6 py-4'>Статус</th>
									<th className='px-6 py-4'>Код</th>
									<th className='px-6 py-4'>Задержка</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-slate-100 dark:divide-slate-800'>
								{checks.filter((c: any) => c.status === 'DOWN').length === 0 ? (
									<tr>
										<td
											colSpan={4}
											className='px-6 py-16 text-center text-slate-400'
										>
											🎉 За выбранный период сбоев не обнаружено
										</td>
									</tr>
								) : (
									checks
										.filter((c: any) => c.status === 'DOWN')
										.reverse()
										.map((incident: any) => (
											<tr
												key={incident.id}
												className='transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30'
											>
												<td className='px-6 py-4 text-sm text-slate-600 dark:text-slate-300'>
													{new Date(incident.createdAt).toLocaleString()}
												</td>
												<td className='px-6 py-4'>
													<span className='rounded-lg bg-red-100 px-2.5 py-1 text-[10px] font-black text-red-600 dark:bg-red-900/40 dark:text-red-400'>
														DOWN
													</span>
												</td>
												<td className='px-6 py-4 font-mono text-sm text-slate-500'>
													{incident.statusCode || 'Err'}
												</td>
												<td className='px-6 py-4 text-sm text-slate-500'>
													{incident.responseTime}ms
												</td>
											</tr>
										))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</motion.div>
		</main>
	)
}

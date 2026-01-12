'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { exportToPDF } from '@/entities/monitor/lib/export-to-pdf'
import { motion } from 'framer-motion' // Добавили анимации
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
} from 'lucide-react'
import Link from 'next/link'

export default function MonitorDetailsPage() {
	const { id } = useParams()
	const [data, setData] = useState<any>(null)

	// Выносим базовый URL в переменную для чистоты
	const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

	useEffect(() => {
		fetch(`${BASE_URL}/monitors/${id}`)
			.then((res) => res.json())
			.then(setData)
	}, [id, BASE_URL])

	if (!data || !data.checks) {
		return (
			<div className='flex h-screen items-center justify-center text-slate-500 dark:text-slate-400 animate-pulse font-medium'>
				Загрузка детальной статистики...
			</div>
		)
	}

	// --- Расчёт статистики ---
	const totalChecks = data.checks.length
	const upChecks = data.checks.filter((c: any) => c.status === 'UP').length
	const uptimePercentage =
		totalChecks > 0 ? ((upChecks / totalChecks) * 100).toFixed(2) : '0.00'

	const avgLatency =
		totalChecks > 0
			? Math.round(
					data.checks.reduce(
						(acc: number, curr: any) => acc + curr.responseTime,
						0
					) / totalChecks
			  )
			: 0

	const downEvents = data.checks.filter((c: any) => c.status === 'DOWN').length

	const history = data.checks.map((c: any) => ({
		time: new Date(c.createdAt).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		}),
		ms: c.responseTime,
	}))

	return (
		<main className='min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 transition-colors duration-500'>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className='max-w-6xl mx-auto'
			>
				{/* Back Link */}
				<Link
					href='/'
					className='inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-8 group'
				>
					<ArrowLeft
						size={18}
						className='group-hover:-translate-x-1 transition-transform'
					/>
					Назад к дашборду
				</Link>

				{/* Header Section */}
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10'>
					<div>
						<h1 className='text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white'>
							{data.name}
						</h1>
						<p className='text-slate-500 dark:text-slate-400 text-lg mt-1'>
							{data.url}
						</p>
					</div>

					<div className='flex flex-wrap items-center gap-3'>
						{/* Кнопки экспорта */}
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
							onClick={() => exportToPDF(data)} // Исправили передачу объекта
							variant='outline'
							className='rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900'
						>
							<FileDown size={16} className='mr-2' /> PDF
						</Button>

						<div
							className={`ml-2 px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-sm ${
								data.status === 'UP'
									? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
									: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
							}`}
						>
							<div
								className={`w-2 h-2 rounded-full animate-pulse ${
									data.status === 'UP'
										? 'bg-green-600 dark:bg-green-400'
										: 'bg-red-600 dark:bg-red-400'
								}`}
							/>
							{data.status}
						</div>
					</div>
				</div>

				{/* Stats Cards Grid */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
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
							className='bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5'
						>
							<div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>
								<stat.icon size={28} />
							</div>
							<div>
								<p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
									{stat.label}
								</p>
								<p className='text-3xl font-black text-slate-800 dark:text-white'>
									{stat.val}
								</p>
							</div>
						</motion.div>
					))}
				</div>

				{/* Chart Section */}
				<div className='bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-10'>
					<h2 className='text-xl font-bold mb-8 flex items-center gap-2 text-slate-800 dark:text-white'>
						<Activity className='text-blue-500' /> История задержки
					</h2>

					<div className='h-[350px] w-full'>
						<ResponsiveContainer width='100%' height='100%'>
							<AreaChart data={history}>
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
										border: '1px solid #1e293b',
										color: '#f8fafc',
									}}
								/>
								<Area
									type='monotone'
									dataKey='ms'
									stroke='#3b82f6'
									strokeWidth={3}
									fill='url(#colorMs)'
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Incidents Table */}
				<div className='bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden'>
					<div className='p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50'>
						<h2 className='text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white'>
							<AlertTriangle className='text-amber-500' /> Журнал сбоев
						</h2>
					</div>

					<div className='overflow-x-auto'>
						<table className='w-full text-left border-collapse'>
							<thead className='bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest'>
								<tr>
									<th className='px-6 py-4'>Дата и время</th>
									<th className='px-6 py-4'>Статус</th>
									<th className='px-6 py-4'>Код ошибки</th>
									<th className='px-6 py-4'>Задержка</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-slate-100 dark:divide-slate-800'>
								{data.checks.filter((c: any) => c.status === 'DOWN').length ===
								0 ? (
									<tr>
										<td
											colSpan={4}
											className='px-6 py-16 text-center text-slate-400 font-medium'
										>
											🎉 Потрясающе! Сбоев не зафиксировано
										</td>
									</tr>
								) : (
									data.checks
										.filter((c: any) => c.status === 'DOWN')
										.reverse()
										.map((incident: any) => (
											<tr
												key={incident.id}
												className='hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors'
											>
												<td className='px-6 py-4 text-sm text-slate-600 dark:text-slate-300'>
													{new Date(incident.createdAt).toLocaleString()}
												</td>
												<td className='px-6 py-4'>
													<span className='px-2.5 py-1 bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 rounded-lg text-[10px] font-black'>
														DOWN
													</span>
												</td>
												<td className='px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400'>
													{incident.statusCode || 'Timeout'}
												</td>
												<td className='px-6 py-4 text-sm text-slate-500 dark:text-slate-400'>
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

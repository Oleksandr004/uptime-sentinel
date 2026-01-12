'use client'
import { ArrowUpRight, Activity, Zap, ShieldCheck } from 'lucide-react'

interface StatsOverviewProps {
	monitors: any[]
}

export const StatsOverview = ({ monitors }: StatsOverviewProps) => {
	// --- ЛОГИКА РАСЧЕТА (остается без изменений) ---
	const avgUptime =
		monitors.length > 0
			? (
					(monitors.reduce((acc, m) => {
						const up =
							m.checks?.filter((c: any) => c.status === 'UP').length || 0
						const total = m.checks?.length || 1
						return acc + up / total
					}, 0) /
						monitors.length) *
					100
			  ).toFixed(2)
			: '0.00'

	const avgLatency =
		monitors.length > 0
			? Math.round(
					monitors.reduce((acc, m) => acc + (m.latency || 0), 0) /
						monitors.length
			  )
			: 0

	const totalIncidents = monitors.reduce((acc, m) => {
		return acc + (m.checks?.filter((c: any) => c.status === 'DOWN').length || 0)
	}, 0)

	const stats = [
		{
			label: 'Avg. Uptime',
			value: `${avgUptime}%`,
			icon: ShieldCheck,
			color: 'text-green-600 dark:text-green-400',
			trend: '+0.02%',
		},
		{
			label: 'Avg. Latency',
			value: `${avgLatency}ms`,
			icon: Zap,
			color: 'text-yellow-600 dark:text-yellow-400',
			trend: '-12ms',
		},
		{
			label: 'Total Incidents',
			value: totalIncidents.toString(),
			icon: Activity,
			color: 'text-red-600 dark:text-red-400',
			trend: 'за все время',
		},
	]

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
			{stats.map((stat) => (
				<div
					key={stat.label}
					// Добавлены dark:bg-slate-900 и dark:border-slate-800
					className='bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700'
				>
					<div className='flex justify-between items-start'>
						<div>
							{/* Добавлен dark:text-slate-400 */}
							<p className='text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider'>
								{stat.label}
							</p>
							{/* Добавлен dark:text-white */}
							<h3 className='text-3xl font-black mt-1 text-slate-900 dark:text-white'>
								{stat.value}
							</h3>
						</div>
						{/* Иконка теперь в темном блоке dark:bg-slate-800 */}
						<div
							className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 ${stat.color} shadow-inner`}
						>
							<stat.icon size={24} />
						</div>
					</div>
					{/* Тренд теперь темнее в темной теме dark:text-slate-500 */}
					<div className='mt-4 flex items-center text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase'>
						<ArrowUpRight size={14} className='mr-1 text-green-500' />
						<span>{stat.trend}</span>
					</div>
				</div>
			))}
		</div>
	)
}

'use client'

import { MonitorCard } from '@/entities/monitor/ui/monitor-card'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { SearchX } from 'lucide-react'

// --- Анимация контейнера ---
const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1, // Задержка между появлением карточек
		},
	},
}

// --- Анимация каждой карточки ---
const itemVariants: Variants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { type: 'spring', stiffness: 300, damping: 24 },
	},
	exit: { scale: 0.9, opacity: 0 },
}

interface MonitorListProps {
	monitors: {
		id: string
		name: string
		url: string
		status: 'UP' | 'DOWN' | 'PENDING'
		latency: number
		history: { ms: number }[]
	}[]
}

export const MonitorList = ({ monitors }: MonitorListProps) => {
	if (!monitors || monitors.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				className='flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800'
			>
				<SearchX
					size={40}
					className='text-slate-300 dark:text-slate-600 mb-4'
				/>
				<h3 className='text-lg font-bold text-slate-900 dark:text-white'>
					Ничего не найдено
				</h3>
			</motion.div>
		)
	}

	return (
		<motion.div
			layout
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
		>
			<AnimatePresence mode='popLayout'>
				{monitors.map((monitor) => (
					<motion.div
						key={monitor.id}
						layout
						variants={itemVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
					>
						<MonitorCard {...monitor} />
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	)
}

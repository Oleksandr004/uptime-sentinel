'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export const ThemeToggle = () => {
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme, setTheme } = useTheme()

	useEffect(() => setMounted(true), [])
	if (!mounted) return <div className='w-10 h-10' />

	const isDark = resolvedTheme === 'dark'

	return (
		<button
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			className='p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 transition-all group'
			aria-label='Toggle Theme'
		>
			{isDark ? (
				<Sun
					className='text-yellow-400 group-hover:rotate-45 transition-transform'
					size={20}
				/>
			) : (
				<Moon
					className='text-slate-600 group-hover:-rotate-12 transition-transform'
					size={20}
				/>
			)}
		</button>
	)
}

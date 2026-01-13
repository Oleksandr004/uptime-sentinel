'use client'

import { useRouter } from 'next/navigation'
import { Globe, Clock, Tag, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/shared/ui/card'
import { cn } from '@/shared/lib/utils'

// Импортируем схему
import {
	monitorSchema,
	MonitorFormValues,
} from '@/entities/monitor/model/monitor.schema'

export const CreateMonitorForm = () => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<MonitorFormValues>({
		resolver: zodResolver(monitorSchema),
		defaultValues: {
			name: '',
			url: '',
			interval: 60,
		},
	})

	// Наблюдаем за интервалом для активного класса кнопок
	const currentInterval = watch('interval')

	const onSubmit = async (data: MonitorFormValues) => {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monitors`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			})

			if (res.ok) {
				toast.success('Мониторинг запущен!', {
					description: `Ресурс ${data.name} успешно добавлен в систему.`,
				})
				router.push('/')
				router.refresh()
			} else {
				toast.error('Ошибка создания', {
					description: 'Не удалось сохранить монитор. Попробуйте позже.',
				})
			}
		} catch (err) {
			console.error('Fetch error:', err)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			{/* Основные данные */}
			<Card className='border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-lg text-slate-900 dark:text-slate-100'>
						<Tag className='w-5 h-5 text-blue-600 dark:text-blue-500' />
						Основные данные
					</CardTitle>
					<CardDescription className='text-slate-500 dark:text-slate-400'>
						Введите название и адрес ресурса
					</CardDescription>
				</CardHeader>

				<CardContent className='space-y-4'>
					<div className='space-y-2'>
						<Label
							htmlFor='name'
							className='text-slate-700 dark:text-slate-300'
						>
							Название
						</Label>
						<Input
							id='name'
							{...register('name')}
							placeholder='Напр: API Продакшн'
							className={cn(
								'bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100',
								errors.name && 'border-red-500 focus-visible:ring-red-500'
							)}
						/>
						{errors.name && (
							<p className='text-xs font-medium text-red-500'>
								{errors.name.message}
							</p>
						)}
					</div>

					<div className='space-y-2'>
						<Label htmlFor='url' className='text-slate-700 dark:text-slate-300'>
							URL адрес
						</Label>
						<div className='relative'>
							<Globe className='absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500' />
							<Input
								id='url'
								{...register('url')}
								className={cn(
									'pl-9 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100',
									errors.url && 'border-red-500 focus-visible:ring-red-500'
								)}
								placeholder='https://example.com'
							/>
						</div>
						{errors.url && (
							<p className='text-xs font-medium text-red-500'>
								{errors.url.message}
							</p>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Частота проверок */}
			<Card className='border-slate-200 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-lg text-slate-900 dark:text-slate-100'>
						<Clock className='w-5 h-5 text-blue-600 dark:text-blue-500' />
						Частота проверок
					</CardTitle>
				</CardHeader>

				<CardContent>
					<div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
						{[60, 300, 600, 3600].map((sec) => (
							<Button
								key={sec}
								type='button'
								variant={currentInterval === sec ? 'default' : 'outline'}
								className={cn(
									'h-12 text-xs font-semibold uppercase tracking-wider',
									currentInterval === sec
										? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
										: 'dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
								)}
								onClick={() => setValue('interval', sec)}
							>
								{sec < 3600 ? `${sec / 60} мин.` : '1 час'}
							</Button>
						))}
					</div>
					{errors.interval && (
						<p className='text-xs font-medium text-red-500 mt-2'>
							{errors.interval.message}
						</p>
					)}
				</CardContent>
			</Card>

			{/* Submit */}
			<Button
				type='submit'
				disabled={isSubmitting}
				className='w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-md dark:bg-blue-500 dark:hover:bg-blue-600'
				data-testid='submit-monitor'
			>
				{isSubmitting ? (
					<>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Создание...
					</>
				) : (
					'Запустить мониторинг'
				)}
			</Button>
		</form>
	)
}

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { CreateMonitorForm } from '@/features/monitor/create-monitor/ui/create-form'
import { Button } from '@/shared/ui/button'

export default function AddMonitorPage() {
	return (
		<div className='min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 px-4'>
			<div className='max-w-xl mx-auto'>
				<div className='mb-8'>
					<Button
						variant='ghost'
						asChild
						className='-ml-4 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
					>
						<Link href='/' className='flex items-center gap-1'>
							<ChevronLeft className='h-4 w-4' />
							Вернуться к дашборду
						</Link>
					</Button>
				</div>

				<div className='mb-10'>
					<h1 className='text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>
						Добавить монитор
					</h1>
					<p className='mt-2 text-slate-500 dark:text-slate-400'>
						Настройте параметры мониторинга и уведомлений для вашего сервиса.
					</p>
				</div>

				<CreateMonitorForm />
			</div>
		</div>
	)
}

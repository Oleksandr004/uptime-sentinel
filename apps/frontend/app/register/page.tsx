import { RegisterForm } from '@/features/auth-by-email/ui/RegisterForm'
import { registerSchema } from '@/features/auth-by-email/model/register-schema'
import z from 'zod'

export default function RegisterPage() {
	return (
		<main className='relative min-h-screen flex items-center justify-center bg-[#F8FAFC] overflow-hidden'>
			{/* Декоративные пятна другого оттенка для отличия от логина */}
			<div className='absolute top-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-indigo-50 blur-[100px]' />
			<div className='absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-blue-50 blur-[100px]' />

			<div className='relative z-10 w-full flex justify-center px-4 py-12'>
				<RegisterForm />
			</div>
		</main>
	)
}

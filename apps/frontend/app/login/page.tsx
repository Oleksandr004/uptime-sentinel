import { LoginForm } from '@/features/auth-by-email/ui/LoginForm'

export default function LoginPage() {
	return (
		<main className='relative min-h-screen flex items-center justify-center bg-[#F8FAFC] overflow-hidden'>
			{/* Декоративные элементы фона */}
			<div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px]' />
			<div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-[120px]' />

			<div className='relative z-10 w-full flex justify-center px-4'>
				<LoginForm />
			</div>
		</main>
	)
}

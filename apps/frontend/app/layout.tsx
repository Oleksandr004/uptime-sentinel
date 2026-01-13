import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'sonner'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: {
		default: 'UptimeMonitor — Система контроля доступности',
		template: '%s | UptimeMonitor',
	},
	description:
		'Профессиональный мониторинг ваших сайтов и API с уведомлениями в Telegram и детальной аналитикой задержки.',
	keywords: [
		'uptime',
		'monitoring',
		'api check',
		'devops',
		'nest.js',
		'next.js',
	],
	authors: [{ name: 'ZulFix' }],
	// Open Graph (для красивых ссылок в Telegram/Discord)
	openGraph: {
		title: 'UptimeMonitor — Будьте в курсе работы своих сервисов',
		description:
			'Real-time мониторинг доступности ресурсов с отчетами в PDF и CSV.',
		url: baseUrl,
		siteName: 'UptimeMonitor',
		images: [
			{
				url: '/og-image.png', // Положи скриншот проекта в public/
				width: 1200,
				height: 630,
				alt: 'UptimeMonitor Dashboard',
			},
		],
		locale: 'ru_RU',
		type: 'website',
	},
	// Теги для Twitter
	twitter: {
		card: 'summary_large_image',
		title: 'UptimeMonitor',
		description: 'Система мониторинга сайтов с открытым исходным кодом.',
		images: ['/og-image.png'],
	},
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					{children}
					<Toaster position='top-right' richColors />
				</Providers>
			</body>
		</html>
	)
}

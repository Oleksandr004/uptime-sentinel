'use client'

import { ThemeProvider } from 'next-themes'

export function ProviderForTheme({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute='class' defaultTheme='light' enableSystem={false}>
			{children}
		</ThemeProvider>
	)
}

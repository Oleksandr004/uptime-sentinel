import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Твой будущий URL (например, на Vercel)
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

	// Главная страница
	const routes = [
		'',
		'/add', // если у тебя есть такая страница
	].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: 'daily' as const,
		priority: 1,
	}))

	// В идеале сюда можно добавить и страницы каждого монитора,
	// если ты хочешь, чтобы они были в поиске
	/*
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monitors`)
  const monitors = await res.json()
  const monitorRoutes = monitors.map((m: any) => ({
    url: `${baseUrl}/monitors/${m.id}`,
    lastModified: new Date(),
    priority: 0.7,
  }))
  */

	return [...routes]
}

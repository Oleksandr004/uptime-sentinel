import { Metadata } from 'next'
import MonitorDetailsClient from './MonitorDetails.client'
import { cookies } from 'next/headers'

type Props = {
	params: { id: string }
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
// 	const resolvedParams = await params // разворачиваем промис
// 	const id = resolvedParams.id

// 	if (!id) return { title: 'Монитор не найден' }

// 	const cookieStore = await cookies()
// 	const cookieHeader = cookieStore
// 		.getAll()
// 		.map((c) => `${c.name}=${c.value}`)
// 		.join('; ')

// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monitors/${id}`, {
// 		headers: { Cookie: cookieHeader },
// 		cache: 'no-store',
// 	})

// 	if (!res.ok) return { title: 'Монитор не найден' }
// 	const data = await res.json()

// 	return {
// 		title: `Статистика: ${data.name}`,
// 		description: `Проверка доступности и задержки для ${data.url}`,
// 	}
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params
	const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

	const cookieStore = await cookies()
	const allCookies = cookieStore
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ')

	try {
		const res = await fetch(`${baseUrl}/monitors/${id}`, {
			headers: {
				Cookie: allCookies, // Передаем куки вручную
			},
			next: { revalidate: 60 }, // Можно кэшировать метаданные на минуту
		})

		if (res.status === 401) {
			return { title: 'Нужна авторизация' }
		}

		if (!res.ok) return { title: 'Монитор не найден' }

		const data = await res.json()
		return { title: `Статистика: ${data.name}` }
	} catch (err) {
		return { title: 'Ошибка загрузки' }
	}
}

export default async function Page({ params }: Props) {
	const resolvedParams = await params
	const id = resolvedParams.id

	if (!id) return <div>Monitor ID not found</div>

	return <MonitorDetailsClient id={id} />
}

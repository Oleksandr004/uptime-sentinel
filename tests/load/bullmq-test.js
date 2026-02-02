import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
	stages: [
		{ duration: '3m', target: 100 }, // 20 человек одновременно создают мониторы
	],
}

const BASE_URL = 'http://localhost:5000'

export function setup() {
	// Код логина такой же, как в прошлом тесте (верни куку)
	// ... (копируй сюда логику setup из прошлого теста)

	const loginPayload = JSON.stringify({
		email: 'test@example.com',
		password: 'password123',
	})

	const res = http.post(`${BASE_URL}/auth/login`, loginPayload, {
		headers: { 'Content-Type': 'application/json' },
	})

	// Проверяем, пришли ли куки
	const cookies = res.cookies

	// Выводим имена всех полученных кук для отладки
	console.log('Detected cookies:', Object.keys(cookies).join(', '))

	// Ищем куку (замени 'accessToken' на имя своей куки, если оно другое)
	const authCookie =
		cookies['accessToken'] || cookies['jwt'] || cookies['Authentication']

	if (!authCookie) {
		console.log('Full Response Body:', res.body)
		throw new Error('FAILED: No auth cookie found in response!')
	}

	return { cookieValue: authCookie[0].value, cookieName: authCookie[0].name }
}

export default function (data) {
	const url = `${BASE_URL}/monitors`
	const payload = JSON.stringify({
		name: `Test Monitor ${__VU}-${__ITER}`,
		url: 'https://google.com',
		interval: 60,
		type: 'HTTP',
	})

	const params = {
		headers: {
			'Content-Type': 'application/json',
			Cookie: `${data.cookieName}=${data.cookieValue}`,
		},
	}

	const res = http.post(url, payload, params)

	check(res, {
		'created successfully': (r) => r.status === 201,
	})

	// sleep(1) // Создаем монитор раз в секунду каждым пользователем
}

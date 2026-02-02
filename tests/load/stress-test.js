// import http from 'k6/http'
// import ws from 'k6/ws'
// import { check, sleep } from 'k6'

// // 1. Настройки нагрузки
// export const options = {
// 	stages: [
// 		{ duration: '1m', target: 50 }, // Разгон: до 50 пользователей за минуту
// 		{ duration: '3m', target: 50 }, // Плато: держим 50 пользователей
// 		{ duration: '1m', target: 0 }, // Спад: завершаем тест
// 	],
// 	thresholds: {
// 		http_req_duration: ['p(95)<500'], // 95% запросов должны быть быстрее 500мс
// 	},
// }

// const BASE_URL = 'http://localhost:5000'
// const WS_URL = 'ws://localhost:5000'

// export default function () {
// 	// --- ЭТАП 1: Авторизация ---
// 	const loginPayload = JSON.stringify({
// 		email: 'test@example.com',
// 		password: 'password123',
// 	})

// 	const loginParams = { headers: { 'Content-Type': 'application/json' } }
// 	const loginRes = http.post(
// 		`${BASE_URL}/auth/login`,
// 		loginPayload,
// 		loginParams
// 	)

// 	// check(loginRes, { 'logged in successfully': (r) => r.status === 201 })
// 	check(loginRes, {
// 		'status is 200 or 201': (r) => r.status === 201 || r.status === 200,
// 	})

// 	if (loginRes.status !== 201) return

// 	const token = loginRes.json('accessToken')
// 	const authHeaders = { Authorization: `Bearer ${token}` }

// 	// --- ЭТАП 2: Работа с API ---
// 	const monitorsRes = http.get(`${BASE_URL}/monitors`, { headers: authHeaders })
// 	check(monitorsRes, { 'got monitors list': (r) => r.status === 200 })

// 	// --- ЭТАП 3: WebSocket соединение ---
// 	// Имитируем клиента, который открыл Dashboard и ждет обновлений
// 	ws.connect(WS_URL, null, function (socket) {
// 		socket.on('open', () => {
// 			console.log('WS connected')
// 			// В Socket.io нужно отправить системное сообщение для "приветствия"
// 			// Но для базового теста достаточно просто держать соединение
// 		})

// 		socket.setInterval(function () {
// 			socket.ping()
// 		}, 10000) // Пингуем каждые 10 секунд

// 		socket.setTimeout(function () {
// 			socket.close()
// 		}, 60000) // Держим соединение минуту и закрываем
// 	})

// 	sleep(Math.random() * 5) // Пауза между итерациями "пользователя"
// }
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
	stages: [
		// { duration: '30s', target: 20 },
		// { duration: '1m', target: 50 },
		// { duration: '30s', target: 0 },
		{ duration: '1m', target: 100 }, // Разгон до 100 пользователей
		{ duration: '2m', target: 250 }, // Прыжок до 250 (здесь база может начать греться)
		{ duration: '1m', target: 500 }, // Экстремальный тест на 500 юзеров
		{ duration: '30s', target: 0 },
	],
	thresholds: {
		http_req_duration: ['p(95)<200'],
		http_req_failed: ['rate<0.01'],
	},
}

const BASE_URL = 'http://localhost:5000'

export function setup() {
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
	// k6 автоматически управляет куками, если передать их в jar,
	// но самый надежный способ — передать вручную в заголовке Cookie
	const params = {
		headers: {
			Cookie: `${data.cookieName}=${data.cookieValue}`,
		},
	}

	const res = http.get(`${BASE_URL}/monitors`, params)

	check(res, {
		'status is 200': (r) => r.status === 200,
		'is not unauthorized': (r) => r.status !== 401,
	})

	// sleep(0.5)
}

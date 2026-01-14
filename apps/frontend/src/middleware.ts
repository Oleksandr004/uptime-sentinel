import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const token = request.cookies.get('accessToken')?.value
	const { pathname } = request.nextUrl

	// Если пользователь залогинен и пытается зайти на /login или /register
	if (token && (pathname === '/login' || pathname === '/register')) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	// Если пользователь НЕ залогинен и пытается зайти на защищенные пути (если они есть кроме /)
	// В твоем случае мы оставляем / доступным для всех, но внутри страницы решим что показать
	if (!token && pathname === '/add-monitor') {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

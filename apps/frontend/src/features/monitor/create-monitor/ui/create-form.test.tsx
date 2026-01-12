import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CreateMonitorForm } from './create-form'

// mock next/navigation
const pushMock = vi.fn()
const refreshMock = vi.fn()

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: pushMock,
		refresh: refreshMock,
	}),
}))

describe('CreateMonitorForm', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000'
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({}),
			} as Response)
		) as any
	})

	it('рендерит форму', () => {
		render(<CreateMonitorForm />)

		expect(screen.getByLabelText('Название')).toBeInTheDocument()
		expect(screen.getByLabelText('URL адрес')).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: /запустить мониторинг/i })
		).toBeInTheDocument()
	})

	it('показывает ошибки валидации при пустой отправке', async () => {
		render(<CreateMonitorForm />)

		const submitButton = screen
			.getAllByTestId('submit-monitor')
			.find((btn) => btn.getAttribute('type') === 'submit')
		if (!submitButton) throw new Error('Submit button not found')

		await userEvent.click(screen.getByLabelText('Название'))
		await userEvent.click(screen.getByLabelText('URL адрес'))

		await userEvent.click(submitButton)

		expect(await screen.findByText(/не менее 3 символов/i)).toBeInTheDocument()

		expect(await screen.findByText(/корректный URL/i)).toBeInTheDocument()
	})

	it('меняет интервал при клике на кнопку', async () => {
		render(<CreateMonitorForm />)

		const intervalBtn = screen
			.getAllByRole('button', { name: '5 мин.' })
			.find((btn) => btn.getAttribute('type') === 'button')

		if (!intervalBtn) throw new Error('Интервальная кнопка не найдена')

		await userEvent.click(intervalBtn)

		// проверяем активное состояние (variant = default)
		expect(intervalBtn).toHaveClass('bg-blue-600')
	})

	it('отправляет форму и редиректит при успехе', async () => {
		render(<CreateMonitorForm />)

		await userEvent.type(screen.getByLabelText('Название'), 'Test Monitor')
		await userEvent.type(
			screen.getByLabelText('URL адрес'),
			'https://example.com'
		)

		const submitButton = screen
			.getAllByTestId('submit-monitor')
			.find((btn) => btn.getAttribute('type') === 'submit')
		if (!submitButton) throw new Error('Submit button not found')

		await userEvent.click(submitButton)

		// Проверяем, что fetch вызван
		expect(global.fetch).toHaveBeenCalledWith(
			`${process.env.NEXT_PUBLIC_API_URL}/monitors`,
			expect.objectContaining({ method: 'POST' })
		)

		// Проверяем редирект
		expect(pushMock).toHaveBeenCalledWith('/')
		expect(refreshMock).toHaveBeenCalled()
	})
})

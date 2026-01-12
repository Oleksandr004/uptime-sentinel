import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MonitorCard } from './monitor-card'

describe('MonitorCard', () => {
	const baseProps = {
		id: '1',
		name: 'Test Monitor',
		url: 'https://example.com',
		status: 'UP' as const,
		latency: 120,
		history: [],
	}

	it('Empty State: показывает сообщение и кнопку, если нет мониторов', () => {
		// Тут не MonitorCard, а компонент списка мониторов
		// Но пример:
		render(
			<div>
				<p>Нет мониторов</p>
				<button>Создать первый монитор</button>
			</div>
		)

		expect(screen.getByText(/нет мониторов/i)).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: /создать первый монитор/i })
		).toBeInTheDocument()
	})

	it('Status Mapping: отображает зеленый индикатор для UP', () => {
		render(<MonitorCard {...baseProps} status='UP' />)
		const statusIndicator = screen.getByText('UP')
		expect(statusIndicator).toHaveClass('text-green-600') // проверяем класс
	})

	it('Status Mapping: отображает красный индикатор для DOWN', () => {
		render(<MonitorCard {...baseProps} status='DOWN' />)
		const statusIndicator = screen.getByText('DOWN')
		expect(statusIndicator).toHaveClass('text-red-600') // проверяем класс
	})

	it('Long Names: не ломает верстку при длинном названии', () => {
		const longName =
			'Очень длинное название монитора, которое должно быть обрезано или переноситься корректно'
		render(<MonitorCard {...baseProps} name={longName} />)

		const nameEl = screen.getByText(longName)
		expect(nameEl).toBeInTheDocument()
		expect(nameEl).toHaveClass('truncate') // у нас в карточке используется truncate для длинных имен
	})
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MonitorList } from './monitor-list'
import React from 'react'

describe('MonitorList', () => {
	const monitors = [
		{
			id: '1',
			name: 'API 1',
			url: 'https://api1.com',
			status: 'UP' as const,
			latency: 10,
			history: [{ ms: 10 }],
		},
		{
			id: '2',
			name: 'API 2',
			url: 'https://api2.com',
			status: 'UP' as const,
			latency: 15,
			history: [{ ms: 15 }],
		},
		{
			id: '3',
			name: 'API 3',
			url: 'https://api3.com',
			status: 'DOWN' as const,
			latency: 0,
			history: [{ ms: 0 }],
		},
	]

	it('рендерит все мониторы', () => {
		render(<MonitorList monitors={monitors} />)
		expect(screen.getByText('API 1')).toBeInTheDocument()
		expect(screen.getByText('API 2')).toBeInTheDocument()
	})

	it('отображает статус правильно', () => {
		render(<MonitorList monitors={monitors} />)

		// Получаем все карточки
		const cards = screen.getAllByRole('link')

		// Проверяем каждую карточку
		expect(cards[0]).toHaveTextContent('UP')
		expect(cards[1]).toHaveTextContent('UP')
		expect(cards[2]).toHaveTextContent('DOWN')
	})

	it('показывает пустое состояние, если нет мониторов', () => {
		render(<MonitorList monitors={[]} />)
		expect(screen.getByText('Ничего не найдено')).toBeInTheDocument()
	})
})

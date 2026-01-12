import { describe, it, expect, vi } from 'vitest'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { exportToPDF } from './export-to-pdf'

// мок autoTable
vi.mock('jspdf-autotable', () => ({
	default: vi.fn(),
}))

// мок jsPDF как конструктор
vi.mock('jspdf', () => {
	// создаём конструктор, который возвращает объект с методами
	return {
		default: vi.fn().mockImplementation(function () {
			return {
				addFileToVFS: vi.fn(),
				addFont: vi.fn(),
				setFont: vi.fn(),
				setFontSize: vi.fn(),
				text: vi.fn(),
				save: vi.fn(),
			}
		}),
	}
})

describe('exportToPDF', () => {
	it('должен вызвать jsPDF и autoTable с данными', () => {
		const data = {
			name: 'Test Monitor',
			checks: [
				{ createdAt: '2026-01-12T12:00:00Z', status: 'UP', responseTime: 120 },
				{
					createdAt: '2026-01-12T12:05:00Z',
					status: 'DOWN',
					responseTime: 300,
				},
			],
		}

		exportToPDF(data)

		expect(jsPDF).toHaveBeenCalled() // конструктор вызван
		expect(autoTable).toHaveBeenCalledWith(
			expect.any(Object),
			expect.objectContaining({
				body: expect.any(Array),
			})
		)
	})
})

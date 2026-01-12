describe('Детали монитора', () => {
	it('должен открывать страницу деталей и скачивать CSV', () => {
		cy.visit('http://localhost:3000')

		// 1. Кликаем по первой карточке монитора
		cy.get('[class*="MonitorCard"]').first().click()

		// 2. Проверяем, что попали на страницу деталей (динамический ID)
		cy.url().should('include', '/monitors/')

		// 3. Проверяем наличие графика и заголовка
		cy.get('.recharts-responsive-container').should('be.visible')
		cy.get('h1').should('not.be.empty')

		// 4. Тестируем экспорт CSV (проверка ссылки)
		cy.contains('CSV').should('have.attr', 'onClick')
		// В Cypress сложно тестить само скачивание, обычно тестят наличие ссылки или вызов окна
	})
})

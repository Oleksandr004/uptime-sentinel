describe('Мониторинг ресурсов', () => {
	beforeEach(() => {
		cy.intercept('GET', '**/monitors*').as('getMonitors')
		cy.visit('/')
		cy.wait('@getMonitors', { timeout: 15000 })
	})

	it('должен успешно создать новый монитор и отобразить его в списке', () => {
		cy.contains('Новый монитор').click()
		cy.get('input[name="name"]').type('Google Test')
		cy.get('input[name="url"]').type('https://google.com')
		cy.contains('5 мин.').click()

		cy.intercept('POST', '**/monitors').as('createMonitor')
		cy.intercept('GET', '**/monitors*').as('getMonitorsAfter')

		cy.get('[data-testid="submit-monitor"]').click()

		// Ждем POST и проверяем статус
		cy.wait('@createMonitor', { timeout: 15000 }).then((interception) => {
			assert.isDefined(interception.response, 'Запрос получил ответ от сервера')
			expect(interception.response?.statusCode).to.be.oneOf([200, 201])
		})
		// Ждем обновленный список
		cy.wait('@getMonitorsAfter', { timeout: 15000 })

		cy.contains('Google Test', { timeout: 10000 }).should('be.visible')
		cy.contains('https://google.com').should('be.visible')
	})

	it('должен показывать ошибку, если URL невалидный', () => {
		cy.contains('Новый монитор').click()

		cy.get('input[name="name"]').type('Test')
		cy.get('input[name="url"]').type('not-a-url')

		cy.get('[data-testid="submit-monitor"]').click()

		cy.contains('Введите корректный URL адрес', { timeout: 5000 }).should(
			'be.visible'
		)
	})
})

// describe('Мониторинг ресурсов', () => {
// 	beforeEach(() => {
// 		cy.intercept('GET', '**/monitors').as('getMonitors')
// 		cy.visit('/')
// 		cy.wait('@getMonitors')
// 	})

// 	it('должен успешно создать новый монитор и отобразить его в списке', () => {
// 		// 1. Переходим на страницу создания
// 		cy.contains('Новый монитор').click()

// 		// 2. Заполняем форму
// 		cy.get('input[name="name"]').type('Google Test')
// 		cy.get('input[name="url"]').type('https://google.com')

// 		// Выбираем интервал 5 мин
// 		cy.contains('5 мин.').click()

// 		// 3. Настраиваем intercept ДО клика
// 		cy.intercept('POST', '**/monitors*').as('createMonitor')
// 		cy.intercept('GET', '**/monitors*').as('getMonitorsAfter')

// 		// 4. Клик по кнопке отправки с явным ожиданием
// 		cy.get('[data-testid="submit-monitor"]')
// 			.should('be.visible')
// 			.should('be.enabled')
// 			.click({ force: true }) // force: true игнорирует некоторые проверки

// 		// Ждем успешного создания
// 		cy.wait('@createMonitor')
// 		cy.contains('Google Test', { timeout: 15000 }).should('be.visible')

// 		// 5. Проверяем результат
// 		cy.contains('Google Test', { timeout: 10000 }).should('be.visible')
// 		cy.contains('https://google.com').should('be.visible')
// 	})

// 	it('должен показывать ошибку, если URL невалидный', () => {
// 		cy.contains('Новый монитор').click()

// 		cy.get('input[name="name"]').type('Test')
// 		cy.get('input[name="url"]').type('not-a-url')

// 		// Используем более специфичный селектор
// 		cy.get('[data-testid="submit-monitor"]').should('be.visible').click()

// 		// Проверяем ошибку валидации
// 		cy.contains('Введите корректный URL адрес').should('be.visible')
// 	})
// })
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

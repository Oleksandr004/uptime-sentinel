describe('Мониторинг ресурсов', () => {
	beforeEach(() => {
		// Адрес твоего фронтенда (можно вынести в cypress.config.ts)
		cy.visit('http://localhost:3000')
	})

	it('должен успешно создать новый монитор и отобразить его в списке', () => {
		// 1. Переходим на страницу создания (если есть кнопка)
		cy.contains('Новый монитор').click()

		// 2. Заполняем форму
		cy.get('input[name="name"]').type('Google Test')
		cy.get('input[name="url"]').type('https://google.com')

		// Выбираем интервал 5 мин (300 сек)
		cy.contains('5 мин.').click()

		// 3. Отправляем форму
		cy.contains('Запустить мониторинг').click()

		// 4. Проверяем редирект на главную и наличие новой карточки
		cy.url().should('eq', 'http://localhost:3000/')
		cy.contains('Google Test').should('be.visible')
		cy.contains('https://google.com').should('be.visible')
	})

	it('должен показывать ошибку, если URL невалидный', () => {
		cy.contains('Новый монитор').click()
		cy.get('input[name="url"]').type('not-a-url')
		cy.contains('Запустить мониторинг').click()

		// Проверяем текст ошибки из Zod
		cy.contains('Введите корректный URL адрес').should('be.visible')
	})
})

// describe('Детали монитора', () => {
// 	it('должен открывать страницу деталей и позволять экспорт CSV', () => {
// 		cy.intercept('GET', '**/monitors*').as('getMonitors')
// 		cy.visit('/')

// 		cy.wait('@getMonitors', { timeout: 10000 })
// 			.its('response.statusCode')
// 			.should('be.oneOf', [200, 304])

// 		// Находим карточку
// 		cy.get('[data-testid="monitor-card"]', { timeout: 10000 })
// 			.should('be.visible')
// 			.first()
// 			.click()

// 		cy.location('pathname', { timeout: 5000 }).should('match', /^\/monitor\/.+/)

// 		cy.intercept('GET', '**/monitors/*').as('getMonitorDetails')
// 		// cy.wait('@getMonitorDetails', { timeout: 10000 })

// 		cy.get('[data-testid="monitor-title"]', { timeout: 7000 }).should(
// 			'be.visible'
// 		)

// 		cy.get('[data-testid="monitor-chart"]', { timeout: 7000 }).should(
// 			'be.visible'
// 		)

// 		cy.get('[data-testid="export-csv"]', { timeout: 7000 })
// 			.should('be.visible')
// 			.and('not.be.disabled')
// 	})
// })

describe('Детали монитора', () => {
	it('должен открывать страницу деталей и позволять экспорт CSV', () => {
		cy.intercept('GET', '**/monitors*').as('getMonitors')
		cy.visit('/')
		cy.wait('@getMonitors', { timeout: 15000 })

		// Ждем, пока карточки реально отрендерятся
		cy.get('[data-testid="monitor-card"]', { timeout: 15000 })
			.should('exist')
			.first()
			.click()

		cy.location('pathname', { timeout: 5000 }).should('match', /^\/monitor\/.+/)

		cy.intercept('GET', '**/monitors/*').as('getMonitorDetails')
		cy.wait('@getMonitorDetails', { timeout: 15000 })
			.its('response.statusCode')
			.should('be.oneOf', [200, 304])

		cy.get('[data-testid="monitor-title"]', { timeout: 7000 }).should(
			'be.visible'
		)
		cy.get('[data-testid="monitor-chart"]', { timeout: 7000 }).should(
			'be.visible'
		)
		cy.get('[data-testid="export-csv"]', { timeout: 7000 })
			.should('be.visible')
			.and('not.be.disabled')
	})
})

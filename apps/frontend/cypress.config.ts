// import { defineConfig } from 'cypress'
// export default defineConfig({
// 	e2e: {
// 		baseUrl: 'http://localhost:3000',
// 		supportFile: false,
// 		viewportWidth: 1280,
// 		viewportHeight: 720,
// 	},
// })

import { defineConfig } from 'cypress'
export default defineConfig({
	e2e: {
		baseUrl: 'http://frontend:3000',
		defaultCommandTimeout: 10000,
		pageLoadTimeout: 60000,
		requestTimeout: 10000,
	},
})

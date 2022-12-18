/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				"primary-color": "var(--primary-color)",
				"dark-primary-color": "var(--dark-primary-color)",
				"secondary-color": "var(--secondary-color)",
				"dark-secondary-color": "var(--dark-secondary-color)",
				"background-color": "var(--background-color)",
				"dark-background-color": "var(--dark-background-color)",
				"text-color": "var(--text-color)",
				"dark-text-color": "var(--dark-text-color)",
				"button-background-color": "var(--button-background-color)",
				"dark-button-background-color": "var(--dark-button-background-color)",
				"correct-color": "var(--correct-color)",
				"dark-correct-color": "var(--dark-correct-color)",
				"incorrect-color": "var(--incorrect-color)",
			}
		}
	},
	plugins: [],
  }
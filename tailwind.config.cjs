const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				"background-color": "var(--background-color)",
				"dark-background-color": "var(--dark-background-color)",
				"text-color": "var(--text-color)",
				"dark-text-color": "var(--dark-text-color)",
				"button-background-color": "var(--button-background-color)",
				"dark-button-background-color": "var(--dark-button-background-color)",
			}
		}
	},

	plugins: [],
	darkMode: 'class'
};

module.exports = config;

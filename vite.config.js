// vite.config.js
const path = require("path");
const { defineConfig } = require("vite");
import eslintPlugin from "vite-plugin-eslint";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import tsconfigPaths from "vite-tsconfig-paths";

module.exports = defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "Diorama",
			fileName: format => `index.${format}.js`,
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ["react", "react-dom"],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					react: "react",
					"react-dom": "react-dom",
				},
			},
		},
	},
	plugins: [
		tsconfigPaths(),
		eslintPlugin(),
		checker({ typescript: true }),
		dts({ rollupTypes: true }),
		cssInjectedByJsPlugin(),
	],
});


import GUI from './lib/gui';
import './main.css';

new GUI()

// const root = document.querySelector<HTMLElement>('#__root__')
// const preview = document.createElement('iframe')

// const toggleTheme = () => {}

// const updateRenderPreview = (paths: string) => {
// console.log(paths)
// const [htmlPath, cssPath, jsPath] = paths.map((path) => __dirname + path)

// Promise.all([import(htmlPath), import(cssPath), import(jsPath)]).then(
//   (res) => {
//   }
// )

// const stringHTML = `
// 	<!doctype html>
// 	<html>
// 		<head>
// 			<style>${css}</style>
// 		</head>
// 		<body>
// 			${html}
// 			<script lang="ts" type="module">${js}</script>
// 		</body>
// 	</html>
// `

// preview.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(stringHTML)
// root.appendChild(preview)
// }

// const init = () => {
//   updateRenderPreview(PARAMS.component)

//   console.log('dom loaded!')
// }

// document.addEventListener('DOMContentLoaded', init)

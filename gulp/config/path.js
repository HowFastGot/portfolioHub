// Получаем имя папки проекта
import * as nodePath from 'path';
let rootFolder = nodePath.basename(nodePath.resolve());

// Можна использовать так же дерикторию dist
const buildFolder = `./dist`; //путь к папке с результатом
// const buildFolder = `./Application/MAMP/htdocs/test`;
const srcFolder = `./src`; //путь к папке с исходниками
// Объект работы с файлами
export const path = {
	build: {
		js: `${buildFolder}/js/`,
		images: `${buildFolder}/img/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,

		source: `${buildFolder}/assets/`,
		translations: `${buildFolder}/translations/`,
		projects: `${buildFolder}/projects/`,
	},
	src: {
		js: `${srcFolder}/js/app.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,ico}`,
		svg: `${srcFolder}/img/**/*.svg`,
		scss: `${srcFolder}/scss/style.scss`,
		html: `${srcFolder}/*.html`,
		files: `${srcFolder}/files/**/*.*`,
		svgicons: `${srcFolder}/svgicons/*.svg`,

		source: `${srcFolder}/assets/**/*.*`,
		translations: `${srcFolder}/translations/**/*.*`,
		projects: `${srcFolder}/projects/**/*.*`,
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
		files: `${srcFolder}/files/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``,
};

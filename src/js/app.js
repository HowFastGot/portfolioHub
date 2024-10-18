import { showTooltip } from './modules/tooltips.js';
import { changePageTheme } from './modules/theme.js';
import { changePageLanguage } from './modules/changePageLanguage.js';
import { form } from './modules/form.js';
import { validateForm } from './modules/validateForm.js';
import { loadingProjects } from './modules/loading-projects.js';
import { handleFocusForm } from './modules/handleFocusForm.js';
import { accordion } from './modules/accordion.js';
import { interSectionScrollHandler } from './modules/intersectionObserver.js';
import { animatePageElements } from './modules/animatePageElements.js';
import { handleScrollToHeader } from './modules/handleScrollToHeader.js';

window.addEventListener('DOMContentLoaded', function (event) {
	'use strict';

	animatePageElements(event);

	showTooltip();
	changePageTheme('.settings-popup');
	changePageLanguage('.settings-popup__lang-menu');
	form('form');
	validateForm();
	loadingProjects('.load-button-block__button-load');
	handleFocusForm();
	accordion('.education-text__tech-list');
	handleScrollToHeader('scrollButton');

	interSectionScrollHandler('.education-text__tech-item');
	interSectionScrollHandler('#frame');
	interSectionScrollHandler('.interview__title');

	// -swiper initialize----
	new Swiper('.mySwiper', {
		slidesPerView: 1,
		spaceBetween: 90,
		freeMode: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		breakpoints: {
			640: {
				slidesPerView: 2,
				spaceBetween: 120,
			},
		},
	});
});

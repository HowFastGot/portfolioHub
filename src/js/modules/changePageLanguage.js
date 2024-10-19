import { changePositionPseudoWorkTitle } from './changePositionPseudoTitle.js';
import { getResource } from '../services/requests.js';
import { errorPopup } from './errorPopup.js';
import { findDOM_node } from './findDOM_node.js';
import { deleteAddedProjects, changeProjectQuantityIndicator } from './loading-projects.js';

import Polyglot from 'node-polyglot';

const possiblePageLangs = {
	en: 'en',
	ua: 'ua',
	ru: 'ru',
};

const setDefaultActiveLangTrigger = () => {
	const langTriggers = findDOM_node('.settings-popup__lang-item', 'multiElems');
	const currentPageLang = getCurrentPageLanguage();

	langTriggers.forEach((trigger) => {
		const certainLangTriggerName = trigger.textContent.toLowerCase().trim();

		if (certainLangTriggerName === currentPageLang) {
			trigger.classList.add('active');
			return;
		}

		trigger.classList.remove('active');
	});
};
const changeActiveLangItem = (e) => {
	const currentTarget = e.currentTarget;
	const languageItemsArray = Array.from(currentTarget.children);

	if (languageItemsArray.length < 1 || !languageItemsArray.includes(e.target)) return;

	const indexOfClickedItem = languageItemsArray.indexOf(e.target);

	languageItemsArray.map((item, id) => {
		item.classList.remove('active');

		if (indexOfClickedItem === id) {
			item.classList.add('active');
		}
	});

	const choosenLang = languageItemsArray[indexOfClickedItem].textContent.toLowerCase().trim();

	setUpSessionStorageLanguage(choosenLang);
	changePositionPseudoWorkTitle(choosenLang);
};

const setUpSessionStorageLanguage = (language = 'en') => {
	language && sessionStorage.setItem('language', possiblePageLangs[language]);
};

function getCurrentPageLanguage() {
	return sessionStorage.getItem('language') ?? 'en';
}

const getAsyncLanguageDataObject = async (languageOfPage) => {
	const languageJSONPath = `../translations/${possiblePageLangs[languageOfPage]}/locale.json`;

	try {
		return await getResource(languageJSONPath);
	} catch (error) {
		errorPopup();
		console.error(`Ошибка доступа к fetch: ${languageJSONPath}!`);
	}
};

const changeTextContentofPage = ({ English, Ukrainian, Russian }) => {
	const polyglot = new Polyglot({ phrases: English ?? Ukrainian ?? Russian });

	const textBlocks = document.querySelectorAll('[data-i18n]');

	if (textBlocks && textBlocks.length < 1) return;

	textBlocks.forEach((textBlock) => {
		const elementKeyAttr = textBlock.dataset.i18n;
		const translatedText = polyglot.t(elementKeyAttr);

		if (elementKeyAttr === translatedText) return;

		textBlock.innerHTML = translatedText;
	});
};

async function pageInternationalization(choosenPageLang) {
	const currentLanguageData = await getAsyncLanguageDataObject(choosenPageLang);
	console.log(currentLanguageData, 'Language model block');
	changeTextContentofPage(currentLanguageData);
}

const comprehensiveFunction = (e) => {
	changeActiveLangItem(e);
	pageInternationalization(getCurrentPageLanguage());

	deleteAddedProjects();
	changeProjectQuantityIndicator();
};

export function changePageLanguage(languagesBlockSelector) {
	const parentLangBlock = findDOM_node(languagesBlockSelector);

	setUpSessionStorageLanguage(getCurrentPageLanguage() ?? possiblePageLangs.en);
	pageInternationalization(getCurrentPageLanguage());
	setDefaultActiveLangTrigger();

	changePositionPseudoWorkTitle(getCurrentPageLanguage());

	parentLangBlock && parentLangBlock.addEventListener('click', comprehensiveFunction);
}
